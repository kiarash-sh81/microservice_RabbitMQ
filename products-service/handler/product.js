const { isAuthentication } = require('../../isAuthenticated');
const { pushToQueue, returnChannel, createQueue } = require('../config/rabbitMQ.config');
const { productModel } = require('../model/products');

const productRouter = require('express').Router();
productRouter.post("/create" , async (req, res, next) =>{
    try {
        const {name , price , desc} = req.body;
        const newProduct = new productModel({
            desc,
            name,
            price
        })
        await newProduct.save();
        return res.json({message: "new product created" , product: newProduct})
    } catch (error) {
        next(error)
    }
})
productRouter.post("/buy" ,isAuthentication , async (req, res, next) =>{
    try {
        console.log(1);
        const {productIDs = []} = req.body;
        const products = await productModel.find({_id : {$in: productIDs}});
        const {email} = req.user;
        await pushToQueue("ORDER" , {products , UserEmail: email});    
        let channel = await returnChannel();
        await createQueue("PRODUCT");
        channel.consume("PRODUCT" ,async msg=>{
            console.log(JSON.parse(msg.content.toString()));
        })   
        return res.json({
            message : "your order created"
        })
    } catch (error) {
        next(error)
    }
})
module.exports ={
    productRouter
}