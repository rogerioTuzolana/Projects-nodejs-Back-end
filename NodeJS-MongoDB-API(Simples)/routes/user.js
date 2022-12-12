const express = require("express");
const userSchema = require("../models/user");
const router = express.Router();

//create user
router.post('/users',(req, res)=>{
    //recebe os dados (formato json)
    const user = userSchema(req.body)
    user.save().then((data)=> res.json(data))
                .catch((error)=>res.json({message:error}))
});

router.get('/users',(req, res)=>{
    //pega todos dados (formato json)
    userSchema.find().then((data)=> res.json(data))
                .catch((error)=>res.json({message:error}))
});

module.exports = router;