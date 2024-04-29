<template>
  <header class="bg-gray-200 fixed w-full z-50">
    <nav class="px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company">
        </div>

        <!-- Mobile menu button -->
        <div class="sm:hidden">
            {{''}}
            {{''}}
          <button @click="isMenuOpen = !isMenuOpen" class="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <!-- Icon for menu button -->
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path :class="{'hidden': isMenuOpen, 'block': !isMenuOpen }" class="inline-flex" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
              <path :class="{'block': isMenuOpen, 'hidden': !isMenuOpen }" class="inline-flex" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden sm:block">
          <div class="flex space-x-4">
            <RouterLink to="/" class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900">Inicio</RouterLink>
            <RouterLink to="/tareas/listado" class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900">Listado de Tareas</RouterLink>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div :class="{'block': isMenuOpen, 'hidden': !isMenuOpen}" class="absolute z-10  w-48 orounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none mt-10 sm:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <RouterLink to="/" class="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Inicio</RouterLink>
          <RouterLink to="/tareas/listado" class="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Listado de Tareas</RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>
<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);
</script>

<style scoped>
header {
  position: fixed; /* Fijar el navbar en la parte superior */
  top: 0;
  left: 0;
  z-index: 1000;
}

nav {
  display: flex;
  width: 100%;
}


@media (min-width: 1024px) {
  header {
    display: flex;
    justify-content: center;
    padding-right: 0;
  }

  nav {
    justify-content: start;
  }
}
</style>