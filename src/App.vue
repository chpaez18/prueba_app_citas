<template>
  <header>
    <nav class="bg-gray-200">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->
          </div>
          <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex flex-shrink-0 items-center">
              <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company">
            </div>
            <div class="hidden sm:ml-6 sm:block">
              <div class="flex space-x-4">
                <RouterLink to="/" >Inicio</RouterLink>
                <RouterLink to="/tareas/listado" >Listado de Tareas</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <RouterView />
</template>

<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import HelloWorld from '@/components/HelloWorld.vue'
</script>

<style scoped>
header {
  line-height: 1.5;
  width: 100%;
  background-color: rgb(31 41 55 / var(--tw-bg-opacity)); /* Color de fondo para el navbar */
  position: fixed; /* Fijar el navbar en la parte superior */
  top: 0;
  left: 0;
  z-index: 1000;
}



.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  display: flex;
  width: 100%;
}


@media (min-width: 1024px) {
  header {
    display: flex;
    justify-content: center; /* Alinear horizontalmente */
    padding-right: 0;
  }

  .logo {
    margin: 0 auto; /* Centrado tanto vertical como horizontal */
  }

  header .wrapper {
    display: flex;
    place-items: center;
    flex-wrap: wrap;
  }

  nav {
    justify-content: start; /* Alineación de enlaces a la izquierda en pantallas grandes */
  }
}
</style>
