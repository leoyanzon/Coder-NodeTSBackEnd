const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = Schema({
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

module.exports = mongoose.model('carts', CartSchema);