import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { upload, uploadToCloudinary } from '../../middlewares/file.middleware.js';
import {isAuth} from '../../authentication/jwt.js';

import { getProducts, productsDetail, buyProducts, changeInventary, createProduct} from '../controllers/products.controller.js';

 const productRoutes = express.Router();

 productRoutes.get('/', getProducts);
 productRoutes.get('/:id', productsDetail);
 productRoutes.post('/', buyProducts);
 productRoutes.post('/addProduct',[ upload.single('image'), uploadToCloudinary],createProduct); 
 productRoutes.put('/inventario/:id', changeInventary);
//  productRoutes.post('/',[ upload.single('imagen'), uploadToCloudinary],createCars); 
//  productRoutes.put('/:id', updateCars);
//  productRoutes.delete('/delete/:id', deleteCar);


export { productRoutes };