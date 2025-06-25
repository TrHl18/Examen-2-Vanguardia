<template>
  <header class="bg-blue-800 text-white shadow-lg">
    <nav class="container mx-auto flex justify-between items-center py-4 px-6">
      <div class="flex items-center space-x-3">
        <span class="text-2xl font-bold tracking-wide">Aseguradora Vanguardia</span>
      </div>
      <ul class="flex space-x-6 items-center">
        <li>
          <router-link to="/" class="hover:text-blue-300 transition">Inicio</router-link>
        </li>
        <li>
          <router-link to="/Polizas" class="hover:text-blue-300 transition">Polizas</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
</script>

<style scoped>
</style>