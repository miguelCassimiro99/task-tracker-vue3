<template lang="pug">
Formulario(@aoSalvarTarefa="salvarTarefa")
.lista
  TarefaComponent(
    v-for="(tarefa, index) in tarefas"
    :tarefa="tarefa"
    :key="index"
    :descricao="tarefa.descricao"
    :duracao="tarefa.duracaoEmSegundos"
  )
  BoxComponent.is-flex.is-justify-content-start.is-align-items-center(
    v-if="tarefas.length === 0"
  )
    h1 Você não realizou nenhuma tarefa hoje
    i.ml-2.fas.fa-face-frown
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Formulario from "@/components/Formulario.vue";
import TarefaComponent from "@/components/Tarefa.vue";
import ITarefa from "@/interfaces/ITarefa";
import BoxComponent from "@/components/BoxComponent.vue";

export default defineComponent({
  name: 'App',
  components: {
    BoxComponent,
    TarefaComponent,
    Formulario
  },
  data() {
    return {
      tarefas: [] as ITarefa[],
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
      this.tarefas.push(tarefa);
    },
  }

});
</script>

<style>
.lista {
  padding: 1.5rem;
}

</style>
