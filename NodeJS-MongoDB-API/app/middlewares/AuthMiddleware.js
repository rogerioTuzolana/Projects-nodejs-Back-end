const jwt = require("jsonwebtoken");
const config = require("../../config/auth");
const {promisify} = require("util");


//verificar se o token e valido

module.exports = async (req, res, next)=>{
    const auth = req.headers.authorization;
    if (!auth) {
        return res.status(401).json({
            error:true,
            code: 130,
            message:"O token de autenticacao nao existe!"
        })
    }

    //console.log(auth);
    const [bearer, token] = auth.split(" ");
    console.log(token);

    try {
        const decoded = await promisify(jwt.verify)(token, config.secret);
        if (!decoded) {
            return res.status(401).json({
                error:true,
                code: 130,
                message:"O token esta expirado!"
            })
        }else{
            req._id = decoded.id;
            next();
        }
    } catch{

        return res.status(401).json({
            error:true,
            code: 130,
            message:"O token e invalido!"
        })
    }
}