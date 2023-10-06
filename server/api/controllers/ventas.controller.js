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
   
    console.log(pedidos,'ventas');
     return res.json({
      //  status : 200,
      //  message : httpStatusCode[200],
      data: { pedidos: pedidos },
    });
   } catch (error) {
    return next(error);
   }
});





export { Orders };
