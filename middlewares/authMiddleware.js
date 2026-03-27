import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


const auth = async (req, res, next) => {
    try {
        const token = await req.headers.authorization.split(" ")[1]
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)
        //
        const user = await decodedToken
        req.user = user
        next()
    } catch (error) {
        return res.status(401).send({error: "Unauthenticated"}) // user mahouch mconnecte wla token texpiret 
    }
}
export default auth 