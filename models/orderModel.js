import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    productName:{
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    total:{
        type: Number,
        required: true
    },
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {
    timestamps: true
})

const Order = mongoose.model('order', orderSchema)
export default Order