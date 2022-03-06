<template lang="pug">
main.columns.is-gapless.is-multiline(:class="{ 'modo-escuro': modoEscuroAtivo }")
  .column.is-one-quarters
    BarraLateral(@aoTemaAlterado="trocarTema")
  .column.is-three-quarters.conteudo
    Formulario(@aoSalvarTarefa="salvarTarefa")
    .lista
      TarefaComponent(
        v-for="(tarefa, index) in tarefas"
        :tarefa="tarefa"
        :key="index"
        :descricao="tarefa.descricao"
        :duracao="tarefa.duracaoEmSegundos"
      )
      BoxComponent.is-flex.is-justify-content-start.is-align-items-center(v-if="tarefas.length === 0")
        h1 Você não realizou nenhuma tarefa hoje
        i.ml-2.fas.fa-face-frown
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from "@/components/BarraLateral.vue";
import Formulario from "@/components/Formulario.vue";
import TarefaComponent from "@/components/Tarefa.vue";
import ITarefa from "@/interfaces/ITarefa";
import BoxComponent from "@/components/BoxComponent.vue";

export default defineComponent({
  name: 'App',
  components: {
    BoxComponent,
    TarefaComponent,
    BarraLateral,
    Formulario
  },
  data() {
    return {
      tarefas: [] as ITarefa[],
      modoEscuroAtivo: false,
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
      this.tarefas.push(tarefa);
    },
    trocarTema(modoEscuroAtivo: boolean): void {
      this.modoEscuroAtivo = modoEscuroAtivo;
    }
  }

});
</script>

<style>
.lista {
  padding: 1.5rem;
}

main {
  --bg-primario: #fff;
  --text-primario: #000;
}

main.modo-escuro {
  --bg-primario: #2b2d42;
  --text-primario: #ddd;
}

.conteudo {
  background: var(--bg-primario);
}

</style>
