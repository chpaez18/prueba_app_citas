<template>
    <div v-if="isOpen" class="modal-overlay" @click.self="closeFromOverlay">
        <div class="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full" @click.stop="stopPropagation">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>

    //Definimos un prop que nos permitira controlar la visibilidad del modal
    //-------------------------------------------------------------------------
        const props = defineProps({
            isOpen: Boolean
        });
    //-------------------------------------------------------------------------

    //Definimos un emit que nos permitira comunicarnos con la vista y controlar la visibilidad del modal
    //-------------------------------------------------------------------------------------------------
        const emits = defineEmits(['update:isOpen']);
    //-------------------------------------------------------------------------------------------------

    //Definimos un metodo que nos permitira cerrar el modal
    //-------------------------------------------------------------------------------------------------
        function closeFromOverlay() {
        emits('update:isOpen', false);
        emits('closedFromOverlay');  //Aqui emitimos un evento para comunicar que el modal se cerro desde el overlay
        }
    //-------------------------------------------------------------------------------------------------
</script>


<style>

.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

</style>