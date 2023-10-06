import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { upload, uploadToCloudinary } from '../../middlewares/file.middleware.js';
import {isAuth} from '../../authentication/jwt.js';

import { Orders, changeStateOrder } from '../controllers/ventas.controller.js';

 const ventasRoutes = express.Router();

 ventasRoutes.get('/', Orders);
 ventasRoutes.put('/:id', changeStateOrder);
//  productRoutes.post('/',[ upload.single('imagen'), uploadToCloudinary],createCars); 
//  productRoutes.put('/:id', updateCars);
//  productRoutes.delete('/delete/:id', deleteCar);


export { ventasRoutes };