import mongoose from 'mongoose'

const PolizaSchema = new mongoose.Schema({
  numeroPoliza: {
    type: String,
    required: true,
    unique: true
  },
  tipoSeguro: {
    type: String,
    enum: ['Auto', 'Vida', 'Hogar', 'Salud'],
    required: true
  },
  titular: {
    type: String,
    required: true
  },
  monto: {
    type: Number,
    required: true
  }
})

const Poliza = mongoose.model('Poliza', PolizaSchema)
export default Poliza
