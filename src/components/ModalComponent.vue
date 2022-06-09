<template lang="pug">
.modal(:class="{ 'is-active': mostrar }" v-if="mostrar")
  .modal-background
  .modal-card
    header.modal-card-head
      slot(name="header")
    section.modal-card-body
      slot(name="body")
    footer.modal-card-foot
      slot(name="footer")


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