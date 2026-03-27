import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import dotenv from 'dotenv'
dotenv.config()
import auth from '../middlewares/authMiddleware.js'

const userRouter = express.Router()
userRouter.post('/register', async (req, res) => {
    try {
        const {username, email, password, zipCode, address, city} = req.body
        if(!username || !email || !password || !zipCode || !address || !city)
            return res.status(422).send({error: "all fields are required"})

        const exists = await User.findOne({email})
        if(exists)
            return res.status(401).send({error: "Email already taken."})
        
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
            username,
            email,
            password: hashedPassword,
            zipCode,
            address,
            city
        })
        const createdUser = await user.save()
        if(createdUser)
            return res.status(200).send({message: "User created successfully"})
        return res.status(500).send({error: "Error creating user"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({error: error.message})
    }
})

userRouter.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body

        if(!email || !password)
            return res.status(422).send({error: "all fields are required"})

        const user = await User.findOne({email})
        if(user){
            const passwordCheck = await bcrypt.compare(password, user.password)
            if(!passwordCheck)
                res.status(422).send({message: "Invalid email or password."})
            
            const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "10d"})
            return res.status(200).send({ 
                user: {
                    _id: user._id,
                    email: user.email,
                    address: user.address,
                    city: user.city,
                    zipCode: user.zipCode,
                },
                token //na5admou biha fel front bech yetconnecta l user 
            })
        }
        return res.status(401).send({message: "Invalid email or password."})
    } catch (error) {
        console.log(error)
        return res.status(500).send({error: error.message})
    }
})

userRouter.get('/user', auth, async (req, res) => {
    const user = await User.findById(req.user.userId)
    return res.status(200).send({
        user:{
                _id: user._id,
                email: user.email,
                address: user.address,
                city: user.city,
                zipCode: user.zipCode,
        }
    })
})

export default userRouter
