import express from 'express';
// import bcrypt from 'bcrypt';
// import jwt from "jsonwebtoken";
// import { upload, uploadToCloudinary } from '../../middlewares/file.middleware.js';
// import {isAuth} from '../../authentication/jwt.js';
import { getGastos, createGasto } from '../controllers/gastos.controller.js';
//import { createPayment } from '../controllers/paypal.controller.js';

 const gastosRoutes = express.Router();

 gastosRoutes.get('/', getGastos);
 gastosRoutes.post('/addGasto', createGasto);
//  productRoutes.post('/',[ upload.single('imagen'), uploadToCloudinary],createCars); 
//  productRoutes.put('/:id', updateCars);
//  productRoutes.delete('/delete/:id', deleteCar);


export { gastosRoutes };