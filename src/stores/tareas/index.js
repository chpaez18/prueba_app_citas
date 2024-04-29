import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTareaStore = defineStore('tarea', {

    state: () => ({
        tareas: []
    }),

    actions: {

        //Setters
        //--------------------------------------------------------------------------------------------------------
            setBookInfo(bookInfo) {
                this.$state.bookInfo = bookInfo
            },

            setQuotes(quotesData) {
                this.$state.quotes = quotesData
            },
        //--------------------------------------------------------------------------------------------------------

        //Getters
        //--------------------------------------------------------------------------------------------------------
            getBookInfo() {
                return this.$state.bookInfo
            },

            getQuotes() {
                return this.$state.quotes
            },

            resetBook() {
                this.$state.bookInfo = ''
                this.$state.quotes = []
            }
        //--------------------------------------------------------------------------------------------------------
    },
    persist: true
})