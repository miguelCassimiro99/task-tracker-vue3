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
          strong {{ tempoEmSegundos }}
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
  data() {
    return {
      tempoEmSegundos: 0,
      isTracking: false,
    }
  },

  methods: {
    iniciar() {
      this.isTracking = true;

      setInterval(() => {
        this.tempoEmSegundos += 1;
      }, 1000);
    },

    finalizar() {
      this.isTracking = false;
    }
  }
});
</script>

<style scoped>

</style>
