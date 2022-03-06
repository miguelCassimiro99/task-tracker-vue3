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
        v-model="descricaoDaTarefa"
      )
    .column
      Temporizador(@aoTemporizadorFinalizado="finalizarTarefa")

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Temporizador from "@/components/Temporizador.vue";

export default defineComponent({
  name: 'FormularioComponent',
  components: {
    Temporizador,
  },
  data() {
    return {
      descricaoDaTarefa: '',
    }
  },
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      console.log(tempoDecorrido);
      this.descricaoDaTarefa = '';
    }
  }
});
</script>

<style scoped>

</style>
