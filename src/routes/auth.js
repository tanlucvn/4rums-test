import express from 'express';
import { register, login } from '../modules/controllers/authController.js'
const authRouter = express.Router();


authRouter.post('/register', register)
authRouter.post('/login', login)

authRouter.get('/', (req, res) => {
    res.json({ route: 'Auth router' })
})

export default authRouter;
