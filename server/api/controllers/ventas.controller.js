import { User } from "../models/User.Model.js";
import { httpStatusCode } from "../../utils/httpStatusCode.js";
import { Ventas } from "../models/Ventas.Model.js";


const Orders = ('/', async (req, res, next) => {
  console.log('Entro');
   //const { userId, estado, avisoId, idUserOld } = req.body;
   try {
    const { userId } = req.params;
    console.log(userId);
    const pedidos = await Ventas.find();
    return res.status(200).json(pedidos);
    //  return res.json({
    //   //  status : 200,
    //   //  message : httpStatusCode[200],
    //   data: { pedidos: pedidos },
    // });
   } catch (error) {
    return next(error);
   }
});
/**
 * cambiar el estado del envio
 */
 const changeStateOrder =( '/', async (req, res, next) =>{
  console.log('Entro');
  try {
    const { id } = req.params;
    console.log(id);  
    const changeState = await Ventas.findByIdAndUpdate(
      id,
      { estadoPedido: "Cobrado" }
    );



  } catch (error) {
    
  }
  

});





export { Orders, changeStateOrder };
