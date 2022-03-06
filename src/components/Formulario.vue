<template lang="pug">
.box.formulario
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
  emits: ['aoSalvarTarefa'],
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
      this.$emit('aoSalvarTarefa', {
        duracaoEmSegundos: tempoDecorrido,
        descricao: this.descricaoDaTarefa
      })
      this.descricaoDaTarefa = '';
    }
  }
});
</script>

<style>
.formulario {
  color: var(--text-primario);
  background: var(--bg-primario);
}

</style>
