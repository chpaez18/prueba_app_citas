<template>
  <!-- Contenedor Principal con margen superior -->
  <div class="wrapper mt-20">

    <!-- Tabla de tareas -->
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-4">
          <div class="flex flex-col items-center w-full max-w-4xl px-4">

            <!-- Contenedor para los controles superiores: dropdown y botón -->
              <div class="flex justify-between w-full mb-4">

                <!-- Dropdown de filtro -->
                  <div class="relative">
                    <!-- $event.target.value captura el valor seleccionado del dropwdown -->
                    <select @change="updateFilter($event.target.value)" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                      <option value="all">Todas las tareas</option>
                      <option value="completed">Tareas Completadas</option>
                      <option value="pending">Tareas Pendientes</option>
                    </select>
                  </div>
                <!-- FIN Dropdown de filtro -->

                <!-- Botón para agregar tarea -->
                  <button @click="isModalOpen = true" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Agregar tarea
                  </button>
                <!-- FIN Botón para agregar tarea -->

              </div>
            <!-- FIN Contenedor para los controles superiores: dropdown y botón -->

            <table class="table-auto w-full rounded-lg bg-white shadow-lg">
              <thead>
                <tr class="bg-gray-200 text-gray-800">
                  <th class="px-4 py-3">Título de la Tarea</th>
                  <th class="px-4 py-3">Descripción</th>
                  <th class="px-4 py-3">Estado</th>
                  <th class="px-4 py-3">Acciones</th>
                </tr>
              </thead>

              <tbody>

                <tr v-if="filteredTasks.length == 0" class="text-center"><td colspan="4" class="p-5">No se han registrado tareas...</td></tr>

                <tr v-else-if="filteredTasks.length" v-for="task in filteredTasks" :key="task.id" class="text-center border-b border-gray-200">
                  <td v-bind:class="{ done: task.completed }" class="px-4 py-3">{{ task.title }}</td>
                  <td v-bind:class="{ done: task.completed }" class="px-4 py-3">{{ (task.description ? task.description : "N/A") }}</td>
                  <td v-bind:class="{ done: task.completed }" class="px-4 py-3">{{ task.completed ? 'Completada' : 'Pendiente' }}</td>
                  <td class="text-center">
                    <button v-if="!task.completed" @click="changeStatus(task.id)" class="bg-blue-500 text-white p-1 rounded">Marcar como completa</button>
                    {{''}}
                    <button @click="deleteTask(task.id)" class="bg-red-500 text-white p-1 rounded">Actualizar</button>
                    {{''}}
                    <button @click="deleteTask(task.id)" class="bg-red-500 text-white p-1 rounded">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
    <!-- FIN Tabla de tareas -->

    <!-- Modal -->
      <Modal :isOpen="isModalOpen" @update:isOpen="isModalOpen = $event" @closedFromOverlay="resetForm">
        <h3 class="font-bold text-lg mb-4"> Agregar Nueva Tarea</h3>

        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
              Título
            </label>
            <input
            id="title"
            class="rounded w-full py-2 px-3 text-gray-700 leading-tight border"
            type="text"
            placeholder="Título de la tarea"
            v-model="title"
            >
        </div>

        <br>

        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
            Descripción
            </label>
            <input
            id="description"
            class="rounded w-full py-2 px-3 text-gray-700 leading-tight border"
            type="text"
            placeholder="Descripción de la tarea"
            v-model="description"
            >
        </div>

        <br>

        <div class="flex items-center justify-between">
            <button @click="closeModal" type="button" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Cancelar
            </button>

            <button @click="createTask" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Agregar Tarea
            </button>
        </div>
      </Modal>
    <!-- FIN Modal -->

  </div>

</template>

<script setup>
import { ref, reactive, computed   } from 'vue';
import Modal from '@/components/Ui/Modal.vue';
import { useSweetAlert } from '@/composables/useSweetAlert';
import { useTaskStore } from '../../stores/tareas/index';

  //Definimos la nueva store a usar
  //---------------------------------------------
    const taskStore = useTaskStore()
    const filteredTasks = computed(() => taskStore.filteredTasks);
    const swal = useSweetAlert();
  //---------------------------------------------

  //Definimos la variables reactivas para guardar la tarea
  //---------------------------------------------
    const title = ref('')
    const description = ref('')
    const isModalOpen = ref(false);
  //---------------------------------------------

  //Funciones de la vista
  //---------------------------------------------
    function createTask() {

      //Validamos que el campo title no este vacio
      //----------------------------------------------------------------
        if (!title.value) {
          swal.fire({
            title: '¡Atención!',
            text: 'El campo título es obligatorio',
            icon: 'warning'
          });
          return;
        }
      //----------------------------------------------------------------

      //Agregamos la tarea a la store
      //----------------------------------------------------------------
        taskStore.addTask({title: title.value, description: description.value, completed: 0}) //el completed lo inicializamos en 0 para indicar que la tarea no ha sido completada
      //----------------------------------------------------------------

      //Mostramos un mensaje de confirmación
      //----------------------------------------------------------------
        swal.fire({
          title: '¡Genial!',
          text: 'Tu tarea se ha creado correctamente',
          icon: 'success'
        });
      //----------------------------------------------------------------

      //Cerramos el modal y reseteamos el formulario
      //----------------------------------------------------------------
        isModalOpen.value = false
        resetForm()
      //----------------------------------------------------------------
    }

    function deleteTask(id) {

      swal.fire({
        title: 'Precaución',
        text: "¿Realmente deseas eliminar la tarea?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, Eliminar!',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {

        if (result.isConfirmed) {

          taskStore.deleteTask(id)

          swal.fire(
            'Eliminada!',
            'La tarea ha sido eliminada.',
            'success'
          );
        }
      });

    }

    function changeStatus(id) {
      taskStore.changeStatusTask(id)
    }

    function updateFilter(value) {
      taskStore.setFilter(value);
    }

    function resetForm() {
      title.value = '';
      description.value = '';
    }

    function closeModal() {
      isModalOpen.value = false;
      resetForm()
    }
  //---------------------------------------------
</script>

<style>

.done {
  text-decoration: line-through;
  opacity: 0.7;
}
</style>

