import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { isAuth } from '../../authentication/jwt.js';
import { upload, uploadToCloudinary } from '../../middlewares/file.middleware.js';

import { loginUser, logoutUser, registerUser, OrderClient,getUsers, getUserById, editUser, resetPassword } from '../controllers/user.controller.js';

 const userRoutes = express.Router();

 
 userRoutes.post('/login/',loginUser);
 userRoutes.post('/register/',registerUser);
 userRoutes.post('/logout/',logoutUser);
 userRoutes.get('/:userId',OrderClient);
 userRoutes.get('/',getUsers);
 userRoutes.get('/:id',getUserById);
 userRoutes.put("/modify/:id", editUser);
 userRoutes.post("/reset-password/:email",resetPassword);
 


export { userRoutes };