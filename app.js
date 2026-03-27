import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import categoryRouter from './routes/categoryRouter.js'
import productRouter from './routes/productRouter.js'
import userRouter from './routes/userRouter.js'
import orderRouter from './routes/orderRouter.js'

const app = express() 

app.use(cors())

app.use(express.json())
app.use('/categories', categoryRouter)
app.use('/products', productRouter)
app.use('/users', userRouter)
app.use('/orders', orderRouter)

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(process.env.PORT, () => console.log(`App running att http://127.0.0.1:${process.env.PORT}`))
}).catch(error => console.log(error))

