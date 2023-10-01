import { httpStatusCode } from "../../utils/httpStatusCode.js";
import { Products } from "../models/Products.Model.js";
import { Ventas } from "../models/Ventas.MOdel.js";
import { ObjectId } from "mongodb";




const getProducts = async (req, res, next) => {
  console.log('Entroxxxxxxxxxxxxx');
  try {
    const products = await Products.find();
    // .populate({ path: "materialIntervencion",select: "descripcion"})
    // .populate({path:'cliente', select :""})
    return res.status(200).json(products);
    // return res.json({
    //   //  status : 200,
    //   //  message : httpStatusCode[200],
    //   data: { avisos: avisos },
    // });
    res.send(products);
  } catch (error) {
    return next(error);
  }
};

const productsDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const products = await Products.findById(id);
    // .populate({ path: "materialIntervencion",select: "descripcion"})
    // .populate({path:'cliente', select :''})
    return res.status(200).json(products);

    return res.json({
      //  status : 200,
      //  message : httpStatusCode[200],
      data: { products: products },
    });
    res.send(avisos);
  } catch (error) {
    return next(error);
  }
};
const buyProducts = async (req, res, next) => {
  //console.log(req.body);
  
  try {
    const orderNumber = generateOrderNumber(); // Generar un número de pedido único para la compra
    const userBuy = req.body.idUser;
    const productsToInsert = req.body.products.map((productData) => {
      return {
        name: productData.name,
        description: productData.description,
        unidades: productData.unidades,
        precio: productData.precio,
      };
    });

    // Crear una venta con el número de pedido
    const newSale = new Ventas({
      orderNumber: orderNumber,
      products: productsToInsert,
      userBuy: userBuy,
      //buyerEmail: buyerEmail, // Agregar el correo electrónico del comprador
    });
    console.log(newSale.userBuy);
    // Guardar la venta en la base de datos
    await newSale.save();

    // Puedes responder con el número de pedido si es necesario
    return res.status(201).json({
      status: 201,
      message: `Venta registrada correctamente, su numero de pedidos es ${orderNumber}`,
      data: { orderNumber: orderNumber },
    });
  } catch (error) {
    return next(error);
  }
};

// const buyProducts = async (req, res, next) => {
//   try {
//     const orderNumber = generateOrderNumber(); // Generar un número de pedido único para la compra

//     const productsToInsert = req.body.map((productData) => {
//       return new Ventas({
//         name: productData.name,
//         description: productData.description,
//         unidades: productData.unidades,
//         precio: productData.precio,
//         orderNumber: orderNumber, // Asignar el mismo número de pedido a todos los productos
//       });
//     });

//     // Insertar los productos en la base de datos
//     const insertedProducts = await Ventas.insertMany(productsToInsert);

//     //console.log(insertedProducts); // Muestra los productos que se han insertado en la base de datos

//     // Puedes responder con los productos insertados si es necesario
//     return res.status(201).json({
//       status: 201,
//       message: 'Productos insertados correctamente',
//       data: { products: insertedProducts },
//     });
//   } catch (error) {
//     return next(error);
//   }
// };

/**
 * Generar numero de pedido por cada compra
 * @returns 
 */
function generateOrderNumber() {
  // Puedes usar una lógica personalizada para generar números de pedido únicos
  // Aquí hay un ejemplo simple que combina una marca de tiempo con un número aleatorio:
  const timestamp = Date.now();
  const randomPart = Math.floor(Math.random() * 1000); // Número aleatorio entre 0 y 999
  return `${timestamp}-${randomPart}`;
}


// const updateCars = async (req, res, next) => {
//   console.log(req.body)
//   try {
//     const { id } = req.params;
//     const update = req.body;
//     const options = { new: true };
//     const updatedCar = await Cars.findByIdAndUpdate(id, update, options);

//     if (!updatedCar) {
//       return res.status(404).json({
//         status: 404,
//         message: httpStatusCode[404],
//         error: "Car not found",
//       });
//     }

//     return res.status(200).json({
//       status: 200,
//       message: httpStatusCode[200],
//       data: { car: updatedCar },
//     });
//   } catch (error) {
//     return next(error);
//   }
// };

// const deleteCar = async(req, res, next)=>{
//   console.log('Entro');
//   try {
//     const { id } = req.params;
   
//     const carDelete = await Cars.findByIdAndDelete(id);

    
//     return res.json({
//       status: 200,
//       message: httpStatusCode[200],
//       data: { car: carDelete },
//     });
//   } catch (error) {
//     return next(error);
//   }
// }










export { getProducts, productsDetail, buyProducts };
