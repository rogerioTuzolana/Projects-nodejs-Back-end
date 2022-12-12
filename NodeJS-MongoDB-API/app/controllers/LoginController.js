const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth");

class LoginController{
    async index(req, res){
        const {email, password} = req.body;
        /*
         *Caso a password nao esteja oculta   let userExist = await User.findOne({email});
        */
        //tambem seleciona o password q esta oculta na selecao
        let userExist = await User.findOne({email}).select('+password');
        
        if (!userExist) {
            return res.status(400).json({
                error:true,
                message:"Usuario nao existe!"
            })
        }

        if(!(await bcrypt.compare(password, userExist.password))){
            return res.status(400).json({
                error:true,
                message:"Senha invalida!"
            })
        }
        userExist.password = undefined;
        console.log(userExist);
        return res.status(200).json({
            user:{
                name: userExist.name,
                email:userExist.email
            },
            token:jwt.sign(
                {id: userExist._id},
                config.secret,
                {expiresIn: config.expiresIn}
            )
        })
    }
}

module.exports = new LoginController()
