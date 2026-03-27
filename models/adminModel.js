import mongoose from 'mongoose'

const adminSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const adminModel = mongoose.model('Admin', adminSchema)