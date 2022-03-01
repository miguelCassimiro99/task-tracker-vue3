<template lang="pug">
.box
  .columns
    .column.is-8(
      role="form"
      aria-label="Formulario para adicionar nova classe"
    )
      input(
        class="input"
        placeholder="Qual task deseja cronometrar?"
      )
    .column
      .is-flex.is-justify-content-space-between.is-align-items-center
        section
          strong 00:00:00
        button(@click="iniciar")
          span.icon
            i.fas.fa-play
          span play
        button(@click="finalizar")
          span.icon
            i.fas.fa-stop
          span stop


</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormularioComponent',
  methods: {
    iniciar() {
      console.log('Oi eu sou o Goku');
    },

    finalizar() {
      console.log('Oi eu sou o Goku');
    }
  }
});
</script>

<style scoped>

</style>
