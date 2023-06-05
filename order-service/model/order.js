const {default: mongoose} = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [{
        _id: String,

    }],
    UserEmail: String,
    totalPrice: Number,
} , {timestamps: true});

const orderModel = mongoose.model("order" , orderSchema);

module.exports ={
    orderModel
}