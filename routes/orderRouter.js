import express from 'express'
import auth from '../middlewares/authMiddleware.js'
import Order from '../models/orderModel.js'

const orderRouter = express.Router()
orderRouter.post('/', auth, async (req, res) => {
    try {
        const {products} = req.body
        const userId = req.user.userId
        products.forEach(async (product) => {
            const order = new Order()
        })
    } catch (error) {
        
    }
})

export default orderRouter