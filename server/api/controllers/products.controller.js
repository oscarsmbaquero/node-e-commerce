import { httpStatusCode } from "../../utils/httpStatusCode.js";
import { Products } from "../models/Products.Model.js";
import { User } from "../models/User.Model.js";
import { Ventas } from "../models/Ventas.Model.js";
import { ObjectId } from "mongodb";

const getProducts = async (req, res, next) => {
  console.log("Entroxxxxxxxxxxxxx");
  try {
    const products = await Products.find();
    //.populate({ path: "numeroPedido", select: "unidades" });

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
// const buyProducts = async (req, res, next) => {
//   //console.log(req.body);

const buyProducts = async (req, res, next) => {
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
      estadoPedido: "Preparando pedido",
    });
    // Guardar la venta en la base de datos
    const newPedidoCliente = await newSale.save();
    await User.updateOne(
      { _id: userBuy },
      { $push: { numeroPedido: newSale._id } },
      { new: true }
    );
    // Itero por los productos para extraer el id y las unidades
    for (const productData of req.body.products) {
      const productId = productData._id;
      const unidadesToSubtract = productData.unidades;
      //Busco en la base de datos cada producto
      const productoActual = await Products.findById(productId);
      //el producto que encuentre con cada id
      if (productoActual) {
        // Le resto las unidades
        const unidadesRestantes = productoActual.unidades - unidadesToSubtract;
        // Actualizo las unidades en la base de datos
        await Products.findByIdAndUpdate(productId, {
          unidades: unidadesRestantes,
        });
      }
    }
    // Responder con el número de pedido si es necesario
    return res.status(201).json({
      status: 201,
      message: `Venta registrada correctamente, su número de pedido es ${orderNumber}`,
      data: { orderNumber: orderNumber },
    });
  } catch (error) {
    return next(error);
  }
};

//   try {
//     const orderNumber = generateOrderNumber(); // Generar un número de pedido único para la compra
//     const userBuy = req.body.idUser;
//     const productsToInsert = req.body.products.map((productData) => {
//       return {
//         name: productData.name,
//         description: productData.description,
//         unidades: productData.unidades,
//         precio: productData.precio,
//       };
//     });

//     // Crear una venta con el número de pedido
//     const newSale = new Ventas({
//       orderNumber: orderNumber,
//       products: productsToInsert,
//       userBuy: userBuy,
//       estadoPedido: "Preparando pédido",
//       //buyerEmail: buyerEmail, // Agregar el correo electrónico del comprador
//     });
//     console.log(newSale);
//     // Guardar la venta en la base de datos
//     const newPedidoCliente = await newSale.save();
//     await User.updateOne(
//       { _id: userBuy },
//       { $push: { numeroPedido: newSale._id } },
//       { new: true }
//     );
//     const estadoUpdated = await Products.findByIdAndUpdate(products._id, {
//       unidades: products.unidades,
//     });

//     // Puedes responder con el número de pedido si es necesario
//     return res.status(201).json({
//       status: 201,
//       message: `Venta registrada correctamente, su numero de pedidos es ${orderNumber}`,
//       data: { orderNumber: orderNumber },
//     });
//   } catch (error) {
//     return next(error);
//   }
// };

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


export { getProducts, productsDetail, buyProducts };
