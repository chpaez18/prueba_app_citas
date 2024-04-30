import { defineStore } from 'pinia'
import { generateID, sleep } from '../../utils';

export const useTaskStore = defineStore('task', {

    state: () => ({
        tasksList: [],
        filter: 'all'
    }),

    getters: {
        filteredTasks: (state) => {

          if (state.filter === 'completed') {

            return state.tasksList.filter(task => task.completed);

          } else if (state.filter === 'pending') {

            return state.tasksList.filter(task => !task.completed);

          }

          return state.tasksList;
        }
    },

    actions: {

        setFilter(filter) {
            this.filter = filter;
        },


        addTask(taskData){

            //Activamos el loading
            this.loading = true;

            //Agregamos la tarea a la lista
            this.tasksList.unshift({
                id: generateID(),
                ...taskData
            });

            //Desactivamos el loading
            this.loading = false;
        },


        updateTask(id, updatedData) {

            //Ubicamos el indice de la tarea en la lista
            //--------------------------------------------------------------------
                const taskIndex = this.tasksList.findIndex(task => task.id === id);
            //--------------------------------------------------------------------

            //Si la tarea existe, actualizamos sus datos
            //--------------------------------------------------------------------
                if (taskIndex !== -1) {
                    /*
                        Usamos el operador de propagacion ...this.tasksList[taskIndex]: se usa aquí para copiar todas las propiedades existentes de la tarea original en un nuevo objeto
                        Usamos el operador de propagacion ...updatedData: que añade todas las propiedades del objeto updatedData al objeto resultante
                    */
                    this.tasksList[taskIndex] = { ...this.tasksList[taskIndex], ...updatedData };
                }
            //--------------------------------------------------------------------
        },

        deleteTask(id){

            //Activamos el loading
            this.loading = true;

            //Filtramos en la lista solo aquellos elementos que no sean el que queremos eliminar, asi simulamos la eliminacion
            this.tasksList = this.tasksList.filter(task => task.id !== id);

            //Desactivamos el loading
            this.loading = false;

        },


        changeStatusTask(id){

            //Activamos el loading
            this.loading = true;

            //Encontramos el índice de la tarea en la lista
            const index = this.tasksList.findIndex(task => task.id === id);

            if (index !== -1) {
                //Cambiamos el estado de completado
                this.tasksList[index].completed = !this.tasksList[index].completed;

                //Movemos la tarea modificada al final del arreglo
                const [completedTask] = this.tasksList.splice(index, 1);
                this.tasksList.push(completedTask);
            }

            //Desactivamos el loading
            this.loading = false;
        },
    },
    persist: true
})