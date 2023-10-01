import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  unidades: { type: Number, required: true },
  precio: { type: Number, required: true },
});

const saleSchema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true }, // Número de pedido único
    userBuy: { type: String, required: false }, // Correo electrónico del comprador
    products: [productSchema], // Un arreglo de productos asociados a la venta
    estadoPedido: { type: String, required: false }, // Número de pedido único
  },
  {
    timestamps: true,
  }
);

const Ventas = mongoose.model('Ventas', saleSchema);

export { Ventas };
