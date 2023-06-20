/* 
Crear un modelo Ticket el cual contará con todas las formalizaciones de la compra. Éste contará con los campos
Id (autogenerado por mongo)
code: String debe autogenerarse y ser único
purchase_datetime: Deberá guardar la fecha y hora exacta en la cual se formalizó la compra (básicamente es un created_at)
amount: Number, total de la compra.
purchaser: String, contendrá el correo del usuario asociado al carrito. 
*/
import mongoose from "mongoose";

const numberRequired = {
  type: Number,
  required: true,
};

const stringRequired = {
  type: String,
  required: true,
};

const stringRequiredUnique = {
  type: String,
  required: true,
  unique: true,
};

const ticketsCollection = "tickets";
const ticketsSchema = new mongoose.Schema({
  code: stringRequiredUnique,
  purchase_datetime: stringRequired,
  amount: numberRequired,
  purchaser: stringRequired,
});

const ticketsModel = mongoose.model(ticketsCollection, ticketsSchema);
export default ticketsModel;
