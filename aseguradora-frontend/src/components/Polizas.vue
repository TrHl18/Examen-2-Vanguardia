<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Pólizas</h1>

    <div class="mb-6 flex gap-2 items-center">
      <input
        v-model="busqueda"
        placeholder="Buscar por número de póliza"
        class="border p-2 rounded w-full max-w-xs"
      />
      <button
        @click="buscarPoliza"
        class="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Buscar
      </button>
      <button
        v-if="buscando"
        @click="limpiarBusqueda"
        class="bg-gray-400 text-white px-4 py-2 rounded"
      >
        Limpiar
      </button>
    </div>

    <form @submit.prevent="guardarPoliza" class="mb-6 space-y-2">
      <input v-model="form.numeroPoliza" placeholder="Número de Póliza" class="border p-2 w-full" />
      <select v-model="form.tipoSeguro" class="border p-2 w-full">
        <option value="">Seleccione tipo de seguro</option>
        <option value="Auto">Auto</option>
        <option value="Vida">Vida</option>
        <option value="Hogar">Hogar</option>
        <option value="Salud">Salud</option>
      </select>
      <input v-model="form.titular" placeholder="Titular" class="border p-2 w-full" />
      <input type="number" v-model.number="form.monto" placeholder="Monto" class="border p-2 w-full" />
      <button class="bg-blue-500 text-white px-4 py-2 rounded">
        {{ form._id ? 'Actualizar' : 'Guardar' }}
      </button>
    </form>

    <ul class="space-y-2">
      <li v-for="poliza in polizas" :key="poliza._id" class="border p-4 rounded flex justify-between">
        <div>
          <p class="font-semibold">#{{ poliza.numeroPoliza }} - {{ poliza.tipoSeguro }}</p>
          <p>Titular: {{ poliza.titular }}</p>
          <p>Monto: L {{ poliza.monto }}</p>
        </div>
        <div class="space-x-2">
          <button @click="editarPoliza(poliza)" class="text-yellow-600">Editar</button>
          <button @click="eliminarPoliza(poliza._id)" class="text-red-600">Eliminar</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const polizas = ref([])
const form = ref({
  numeroPoliza: '',
  tipoSeguro: '',
  titular: '',
  monto: null,
})

const busqueda = ref('')
const buscando = ref(false)

const obtenerPolizas = async () => {
  const res = await axios.get('http://localhost:3000/api/polizas')
  polizas.value = res.data
  buscando.value = false
}

const buscarPoliza = async () => {
  if (!busqueda.value) return obtenerPolizas()
  try {
    const res = await axios.get(`http://localhost:3000/api/polizas/${busqueda.value}`)
    polizas.value = res.data ? [res.data] : []
    buscando.value = true
  } catch {
    polizas.value = []
    buscando.value = true
  }
}

const limpiarBusqueda = () => {
  busqueda.value = ''
  obtenerPolizas()
}

const guardarPoliza = async () => {
  if (form.value._id) {
    await axios.put(`http://localhost:3000/api/polizas/${form.value._id}`, form.value)
  } else {
    await axios.post('http://localhost:3000/api/polizas', form.value)
  }
  form.value = {
    numeroPoliza: '',
    tipoSeguro: '',
    titular: '',
    monto: null
  }
  obtenerPolizas()
}

const editarPoliza = (poliza) => {
  form.value = { ...poliza }
}

const eliminarPoliza = async (id) => {
  const confirmado = confirm('¿Está seguro que desea eliminar esta póliza?');
  if (!confirmado) return;
  await axios.delete(`http://localhost:3000/api/polizas/${id}`)
  obtenerPolizas()
}

onMounted(obtenerPolizas)
</script>
