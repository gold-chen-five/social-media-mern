import express from 'express'
import { login, checkLogin } from '../controllers/auth.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/checkLogin', verifyToken, checkLogin)

router.post('/login', login)



export default router