import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListadoView from '../views/tareas/ListadoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    //Agregamos nuestra nueva ruta de tareas
    //----------------------------------------------------
    {
      path: '/tareas/listado',
      name: 'ListadoView',
      component: ListadoView
    }
    //----------------------------------------------------
  ]
})

export default router
