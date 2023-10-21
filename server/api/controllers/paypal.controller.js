import { User } from "../models/User.Model.js";
import { httpStatusCode } from "../../utils/httpStatusCode.js";
import { Ventas } from "../models/Ventas.Model.js";
import axios from 'axios';

const CLIENT ='AVI2mSi1HfwSJTe-jsOhY3gFkIKbIBXMcnmmumzgregsNeuGmM-VqBJODQpUUsnQmGM-RKggWI9N8axD';
const SECRET ='ELr7p6uKL_Er8xcGmE5mg4llE7TuQrQG0d9-RoWTbdMCfmEmsgXLEIXkHFT8q-WYNCSNuBUPnVeSyBMK';
const PAYPAL_API = 'https://api-m.sandbox.paypal.com';
const auth = { user: CLIENT, pass : SECRET}


//paypal
const createPayment = (req, res) => {


    console.log('entro');
    const body = {
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'EUR', //https://developer.paypal.com/docs/api/reference/currency-codes/
                value: '1'
            }
        }],
        application_context: {
            brand_name: `TECH-MOTO`,
            landing_page: 'NO_PREFERENCE', // Default, para mas informacion https://developer.paypal.com/docs/api/orders/v2/#definition-order_application_context
            user_action: 'PAY_NOW', // Accion para que en paypal muestre el monto del pago
            return_url: `http://localhost:5000/execute-payment`, // Url despues de realizar el pago
            cancel_url: `http://localhost:3000/cancel-payment` // Url despues de realizar el pago
        }
    }
    //https://api-m.sandbox.paypal.com/v2/checkout/orders [POST]
  
    axios.post(`${PAYPAL_API}/v2/checkout/orders`, {
        auth,
        body,
        json: true
    }, (err, response) => {
        console.log(err);
        res.json({ data: response.body })
    })
  }


// const createPayment = (req, res) => {
//     console.log('entro');
//     const body = {
//         intent: 'CAPTURE',
//         purchase_units: [{
//             amount: {
//                 currency_code: 'EUR',
//                 value: '1'
//             }
//         }],
//         application_context: {
//             brand_name: `TECH-MOTO`,
//             landing_page: 'NO_PREFERENCE',
//             user_action: 'PAY_NOW',
//             return_url: `http://localhost:3000/execute-payment`,
//             cancel_url: `http://localhost:3000/cancel-payment`
//         }
//     };

//     const config = {
//         headers: {
//             Authorization: `Basic ${Buffer.from(`${CLIENT}:${SECRET}`).toString('base64')}`,
//             'Content-Type': 'application/json',
//         },
//     };

//     // URL de la API de PayPal
//     const paypalApiUrl = 'https://api-m.sandbox.paypal.com/v2/checkout/orders';

//     axios.post(paypalApiUrl, body, config)
//         .then(response => {
//             res.json({ data: response.data });
//         })
//         .catch(error => {
//             console.error('Error en la solicitud a PayPal:', error);
//             res.status(500).json({ error: 'Hubo un error al comunicarse con PayPal' });
//             console.log(error);
//         });
// };

// Reemplaza 'YOUR_CLIENT_ID' y 'YOUR_CLIENT_SECRET' con tus credenciales de PayPal







export { createPayment };
