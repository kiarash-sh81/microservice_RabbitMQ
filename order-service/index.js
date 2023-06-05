const express = require('express');
const { createOrderWithQueue } = require('./config/rabbitMQ.config');
const { orderRouter } = require('./handler/order');
const app = express();
require('dotenv').config();
const {PORT} = process.env;
require('./config/mongoose.config');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
createOrderWithQueue("ORDER");
app.use( "/order",orderRouter);
app.use((req, res, next) =>{
    return res.json({error: "NotFound"});
});
app.use((error , req, res, next)=>{
    return res.json({error: error.message})
})
app.listen(PORT , () => {
    console.log("server  run on port" , PORT);
})