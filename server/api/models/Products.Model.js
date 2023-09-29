import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productsSchema = new Schema(
  {
    name: { type: String, required: true },    
    description: { type: String, required: true },
    imagen: { 
      data: Buffer,
      contentType: String
    },
    favorite: { type: Boolean, required: false },
    unidades: { type: Number, required: false },
    precio: { type: Number, required: true },
    anio:{ type:Number, required: true }
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model('Products',productsSchema );

export { Products }