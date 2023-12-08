import { httpStatusCode } from "../../utils/httpStatusCode.js";
//import { Products } from "../models/Products.Model.js";
//import { User } from "../models/User.Model.js";
//import { Ventas } from "../models/Ventas.Model.js";
import { Gastos } from "../models/Gastos.Model.js";
import { ObjectId } from "mongodb";

const getGastos = async (req, res, next) => {
  console.log("Entroxxxxxxxxxxxxx");
  try {
    const gastos = await Gastos.find();
    //.populate({ path: "numeroPedido", select: "unidades" });

    // .populate({ path: "materialIntervencion",select: "descripcion"})
    // .populate({path:'cliente', select :""})
    return res.status(200).json(gastos);
    // return res.json({
    //   //  status : 200,
    //   //  message : httpStatusCode[200],
    //   data: { avisos: avisos },
    // });
    //res.send(products);
  } catch (error) {
    return next(error);
  }
};

const gastosDetail = async (req, res, next) => {
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


const createGastos = async (req, res, next) => {
  console.log(req.body)
}


const createGasto = async (req, res, next) => {
  console.log("Entro",req.file);
 
    //console.log("Entro", req.body);
  try {
    const NewGasto = new Gastos({
      nameClient: req.body.nameClient,
      numberIssue: req.body.numberIssue,
      //image: req.file_url,
      //imagen: req.file_url,
      type: req.body.type,
      concepto: req.body.concepto,
      price: req.body.price,
      iva: req.body.iva,
      priceFinal: req.body.priceFinal,
      date: req.body.date,
      image: req.file_url,

      //tipo:req.body.tipo,
    });
    //console.log(NewGasto,'new');
    const newGastoDB = await NewGasto.save();
    return res.json({
      status: 201,
      message: httpStatusCode[201],
      data: { gastos: newGastoDB },
    });
  } catch (error) {
    return next(error);
  }
};



export { getGastos, createGasto };
