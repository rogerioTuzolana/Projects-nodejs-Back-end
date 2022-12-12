const userSchema = require("../models/User");
const bcrypt = require("bcryptjs");
//Para validacao
const yup = require("yup");
const User = require("../models/User");

class UserController{

    index(req,res){
        //console.log(req.body);
        
        return res.status(200).json({
            "nome":"Roger"
            }
        )
    }

    show(req,res){
        //let users = ["Honorio", "Patricio", "Rogerio"]
        let users = User.find()
        .then((data)=>{
            return res.status(200).json({
                error: false,
                data
            })
        })
        .catch(()=>{
            return res.status(400).json({
                error:true,
                message:"Nao existe usuarios!"
            })
        })
    }

    async store(req, res){
        /*Validation
        *Validacao usando yup
        */
        let schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                error:true,
                message:"Dados invalidos!"
            })
        }

        //verifica se ja existe o email
        let emailExist = await userSchema.findOne({email: req.body.email});
        if(emailExist){
            return res.status(400).json({
                error:true,
                message:"Ja existe este email"
            })
        }

        const {name, email, password} = req.body;
        const data = {name, email, password};
        //Criptografar senha
        data.password = await bcrypt.hash(data.password, 8);
        //Guarda dados na DB
        await userSchema.create(data, (err)=>{
            if(err) return res.status(400).json({
                error:true,
                message:"Erro ao tentar inserir usuario"
            })

            return res.status(200).json({
                error:false,
                message:"Usuario inserido"
            })
        })
    }

    showOne(req,res){
        const {id} = req.params;

        User.findById(id)
        .then((data)=>{
            return res.status(200).json({
                error: false,
                data
            })
        })
        .catch(()=>{
            return res.status(400).json({
                error:true,
                message:"Nao existe usuario!"
            })
        })
    }
    update(req,res){
        const {id} = req.params;
        const {name, email, password} = req.body;
        User.updateOne({_id:id},{$set:{name, email, password}})
        .then((data)=>{
            return res.status(200).json({
                error: false,
                data
            })
        })
        .catch(()=>{
            return res.status(400).json({
                error:true,
                message:"Nao existe usuario!"
            })
        })
    }
    drop(req,res){
        const {id} = req.params;
        
        User.remove({_id:id})
        .then((data)=>{
            return res.status(200).json({
                error: false,
                data
            })
        })
        .catch(()=>{
            return res.status(400).json({
                error:true,
                message:"Nao existe usuario!"
            })
        })
    }
}

module.exports = new UserController()