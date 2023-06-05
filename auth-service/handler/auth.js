const { userModel } = require('../model/user');
const JWT = require('jsonwebtoken');
const authRouter = require('express').Router();

authRouter.post("/register" , async (req, res, next)=>{
    try {
        const {name , email , password} = req.body;
        const user = await userModel.findOne({email});
        if(user) throw {message: "this user has been already exist"};
        const newUser = new userModel({
            name,
            email,
            password
        });
        await newUser.save();
        return res.json({
            message: "new user created"
        });
    } catch (error) {
        next(error)
    }
})
authRouter.post("/login" , async (req, res, next)=>{
    try {
        const { email , password} = req.body;
        const user = await userModel.findOne({email} , {__v:0});
        if(!user) throw {message: "user not found"};
        if(user.password !== password) throw {message: "username or password inccorect"};
        JWT.sign({email , name: user.name , id: user._id} , "secretKey" , (err , token)=>{
            if(!err) return res.json({token});
            return {error: err.message}
        });
    } catch (error) {
        next(error)
    }
})

module.exports ={
    authRouter
}