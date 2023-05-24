import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
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


const CartSchema = new Schema({
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

export default mongoose.model('carts', CartSchema);