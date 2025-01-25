



 import express from 'express';
import {  login, logout, register, updateProfile  } from '../controllers/user.controllers.js';
import isAuthenticated from '../middlewares/user.authenticate.js';



const userrouter = express.Router();

// Route for user registration
userrouter.route('/register').post(register);

userrouter.route('/profile/updateProfile').post(isAuthenticated, updateProfile)
userrouter.route('/login').post(login)
userrouter.route('/logout').post(logout)


export default userrouter;




