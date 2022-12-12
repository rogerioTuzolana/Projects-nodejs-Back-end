const express = require("express");
const routes = express.Router();
const UserController = require('../app/controllers/UserController')
const AuthMiddleware = require('../app/middlewares/AuthMiddleware')
const LoginController = require('../app/controllers/LoginController')
//create user
routes.get('/teste',UserController.index);
routes.post('/users',UserController.store);
routes.get('/users', AuthMiddleware,UserController.show);
routes.get('/users/:id', AuthMiddleware,UserController.showOne);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.drop);

routes.post('/login',LoginController.index);
/*routes.post('/users',(req, res)=>{
    //recebe os dados (formato json)
    const user = userSchema(req.body)
    user.save().then((data)=> res.json(data))
                .catch((error)=>res.json({message:error}))
});

routes.get('/users',(req, res)=>{
    //pega todos dados (formato json)
    userSchema.find().then((data)=> res.json(data))
                .catch((error)=>res.json({message:error}))
});
*/
module.exports = routes;