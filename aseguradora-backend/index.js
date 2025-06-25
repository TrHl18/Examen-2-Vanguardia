import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import polizasRoutes from './routes/polizasRoutes.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173' }))

app.use('/api/polizas', polizasRoutes)

const PORT = process.env.PORT || 4000

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado a MongoDB Atlas')
  app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`)
  })
}).catch((err) => console.error('Error de conexión:', err))
