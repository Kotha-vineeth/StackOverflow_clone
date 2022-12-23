import express from 'express';

import { login,signup } from '../controllers/auth.js'
import { getAllUsers,updateProfile } from '../controllers/users.js'
import auth from '../middlewares/auth.js'

const router = express.Router();

//post request to signup and login page
//if /user/signup is post request then goto signup which is present in controllers
router.post('/signup',signup)
router.post('/login',login)

router.get('/getAllUsers',getAllUsers)
router.patch('/update/:id', auth, updateProfile)

export default router
