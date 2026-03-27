import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    zipCode:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const User = mongoose.model('user', userSchema)
export default User