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
    console.log(req.body,789);
    const productsToInsert = req.body.venta.products.map((productData) => {
      return {
        name: productData.name,
        description: productData.description,
        unidades: productData.unidadesCompra,
        precio: productData.precio,
      };
    });
    const precioVenta = req.body.venta.salePrice;
    console.log(precioVenta,62);
    // Crear una venta con el número de pedido
    const newSale = new Ventas({
      orderNumber: orderNumber,
      products: productsToInsert,
      userBuy: userBuy,
      salePrice: precioVenta,
      estadoPedido: "En proceso",
    });
    console.log(newSale,'newSale');
    // Guardar la venta en la base de datos
    const newPedidoCliente = await newSale.save();
    await User.updateOne(
      { _id: userBuy },
      { $push: { numeroPedido: newSale._id } },
      { new: true }
    );
     // Recuperar los datos del usuario
     const user = await User.findById(userBuy);
    // Itero por los productos para extraer el id y las unidades
    for (const productData of req.body.venta.products) {
      const productId = productData._id;
      const unidadesToSubtract = productData.unidadesCompra;
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
      data: { 
        orderNumber: orderNumber,
        user: user, 
      },
      
    });
  } catch (error) {
    return next(error);
  }
};

const changeInventary = async (req, res, next) => {
  console.log('EntroInventaryasdasd');
  try {
    const { id } = req.params;
    const { unidades } = req.body;  // Extrae el estado del cuerpo de la solicitud

    console.log(id, unidades,107);  // Verifica que recibes correctamente la ID y el nuevo estado

    const changeState = await Products.findByIdAndUpdate(
      id,
      { unidades: unidades }, // Actualiza el estado con el nuevo valor
      { new: true } // Para obtener el documento actualizado
    );

    if (!changeState) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    res.status(200).json(changeState);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


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

const createProduct = async (req, res, next) => {
  console.log("Entro",req.file);
  console.log(req.file_url, 46);
  try {
    const NewProduct = new Products({
      name: req.body.name,
      description: req.body.description,
      image: req.file_url,
      //imagen: req.file_url,
      pCompra: req.body.pCompra,
      precio: req.body.pvp,
      unidades: req.body.unidades,
      //tipo:req.body.tipo,
    });
    const newProductDB = await NewProduct.save();
    return res.json({
      status: 201,
      message: httpStatusCode[201],
      data: { cars: newProductDB },
    });
  } catch (error) {
    return next(error);
  }
};


export { getProducts, productsDetail, buyProducts, changeInventary, createProduct };
