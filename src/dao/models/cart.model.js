const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    stock: {
        type: Number,
        required: true
    }
})


const CartSchema = Schema({
    userId: {
        type: String,
        required: true
    },
    products: {
        type: [ProductSchema],
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('carts', CartSchema);