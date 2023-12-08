import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const gastosSchema = new Schema(
  {
    // name: { type: String, required: true },    
    // description: { type: String, required: true },
    image: { 
      data: Buffer,
      contentType: String,
      required: false
    },
    //favorite: { type: Boolean, required: false },
    nameClient: { type: String, required: true },
    numberIssue: { type: String, required: true },
    type: { type: String, required: false },
    concepto: { type: String, required: false },
    price: { type: Number, required: false },
    //numberIssue: { type: String, required: true },
    iva: { type: Number, required: false },
    priceFinal: { type: Number, required: false },
    date: { type: Date, required: false },
    image: { type: String, required: false },
    // anio:{ type:Number, required: true }
  },
  {
    timestamps: true,
  }
);

const Gastos = mongoose.model('Gastos',gastosSchema );

export { Gastos }