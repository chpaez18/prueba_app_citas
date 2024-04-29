<template>
  <NavBar />
  <div class="mt-16">
    <RouterView />
  </div>
</template>

<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import NavBar from '@/components/Ui/Navbar.vue'
</script>


