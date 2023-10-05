import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    user: { type: String, required: true },    
    password: { type: String, required: true },
    mail:{ type:String, required: true},
    tlf:{ type:String, required: true},
    rol:{ type:String, required: true},
    //numeroPedido: { type: Object, required: false },
    numeroPedido: [{ type: mongoose.Types.ObjectId, ref: 'Ventas', required:false }]

    //numeroPedido:  { type: mongoose.Types.ObjectId, ref:'Products', required: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User',userSchema );

export { User }