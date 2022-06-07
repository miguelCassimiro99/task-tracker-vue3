<template lang="pug">
.modal(:class="{ 'is-active': mostrar }" v-if="mostrar")
  .modal-background
  .modal-card
    slot

</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ModalComponent',
  props: {
    mostrar: {
      type: Boolean,
      required: true
    }
  }
})
</script>