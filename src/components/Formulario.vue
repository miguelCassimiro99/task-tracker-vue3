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
          strong {{ tempoDecorrido }}
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
      cronometro: 0,
    }
  },

  computed: {
    tempoDecorrido(): string {
      return new Date(this.tempoEmSegundos * 1000).toISOString().substr(11,8);
    },
  },

  methods: {
    iniciar(): void {
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos += 1;
      }, 1000);
    },

    finalizar(): void {
      clearInterval(this.cronometro);
    }
  }
});
</script>

<style scoped>

</style>
