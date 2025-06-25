import express from 'express'
import Poliza from '../models/Poliza.js'
import cors from 'cors'
const router = express.Router()


router.get('/', async (req, res) => {
  const polizas = await Poliza.find()
  res.json(polizas)
})


router.get('/:id', async (req, res) => {
  try {
    const poliza = await Poliza.findById(req.params.id)
    if (!poliza) {
      return res.status(404).json({ msg: 'Póliza no encontrada' })
    }
    res.json(poliza)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const nuevaPoliza = new Poliza(req.body)
    const guardada = await nuevaPoliza.save()
    res.status(201).json(guardada)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const actualizada = await Poliza.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(actualizada)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await Poliza.findByIdAndDelete(req.params.id)
    res.json({ msg: 'Póliza eliminada' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default router
