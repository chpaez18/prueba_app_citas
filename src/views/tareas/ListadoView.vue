<template>
  <div class="wrapper">

    <div class="row">

      <div class="col-md-12">
        <input
          type="text"
          placeholder="Titulo de la tarea"
          v-model="title"
        />
      </div>

      <br>

      <div class="col-md-12">
        <input
          type="text"
          placeholder="Descripcion de la tarea"
          v-model="description"
        />
      </div>
    </div>

    <br>

    <button @click="createTask()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Agregar Tarea
    </button>

    <br>

    <!-- No hay tareas agregadas -->
      <div v-if="taskStore.tasksList.length == 0 && !taskStore.loading">
        <h3 class="text-center"><strong>No se han registrado tareas...</strong></h3>
      </div>
    <!-- FIN No hay tareas agregadas -->


    <!-- Tabla de tareas -->
      <div v-else-if="taskStore.tasksList.length && !taskStore.loading">
        <div class="container">
          <table class="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-200 text-gray-800 w-full">
            <tr class="text-left border-b-2 border-gray-300">
                <th class="px-4 py-3">Titulo de la Tarea</th>
                <th class="px-4 py-3">Descripcion</th>
                <th class="px-4 py-3">Estado</th>
                <th class="px-4 py-3">Acciones</th>
            </tr>

            <!-- each row -->
            <tr v-for="task in taskStore.tasksList.sort()" :key="task.id" class="bg-gray-100 border-b border-gray-200" v-bind:class="{ done: task.completed }">
               <td class="px-4 py-3"> {{task.title}} </td>
               <td class="px-4 py-3"> {{task.description}} </td>
               <td class="px-4 py-3"> {{ (task.completed == 1 ? 'Completada' : 'Pendiente') }} </td>
               <td class="text-center">
                   <button v-if="!task.completed" @click="changeStatus(task.id)" type="button" class="bg-blue-500 text-gray-100 p-1 text-sm rounded-sm focus:border-4 border-blue-300">Marcar completada</button>
                   {{''}}
                   <button @click="deleteTask(task.id)" type="button" class="bg-red-500 text-gray-100 p-1 text-sm rounded-sm focus:border-4 border-red-300">Eliminar</button>
               </td>
            </tr>

          </table>

        </div>
      </div>
    <!-- FIN Tabla de tareas -->


    <!-- Loader -->
      <div class=""  v-if="taskStore.loading">
        <strong>Cargando...</strong>
      </div>
    <!-- FIN Loader -->

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from '../../stores/tareas/index'

  //Definimos la nueva store a usar
  //---------------------------------------------
    const taskStore = useTaskStore()
  //---------------------------------------------

  //Definimos la variables reactivas para guardar la tarea
  //---------------------------------------------
    const title = ref('')
    const description = ref('')
  //---------------------------------------------

  //Funciones de la vista
  //---------------------------------------------
    function createTask() {
      taskStore.addTask({title: title.value, description: description.value, completed: 0}) //el completed lo inicializamos en 0 para indicar que la tarea no ha sido completada

      title.value = ''
      description.value = ''
    }

    function deleteTask(id) {
      taskStore.deleteTask(id)
    }

    function changeStatus(id) {
      taskStore.changeStatusTask(id)
    }
  //---------------------------------------------
</script>

<style>

.done {
  text-decoration: line-through;
  opacity: 0.7;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

