<template lang="pug">
Formulario(@aoSalvarTarefa="salvarTarefa")
.lista
  BoxComponent.is-flex.is-justify-content-start.is-align-items-center(
    v-if="!tarefas || tarefas.length === 0"
  )
    h1 Você não realizou nenhuma tarefa hoje
    i.ml-2.fas.fa-face-frown
  TarefaComponent(
    v-else
    v-for="(tarefa, index) in tarefas"
    :tarefa="tarefa"
    :key="index"
    :descricao="tarefa.descricao"
    :duracao="tarefa.duracaoEmSegundos"
  )
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Formulario from "@/components/Formulario.vue";
import TarefaComponent from "@/components/Tarefa.vue";
import ITarefa from "@/interfaces/ITarefa";
import BoxComponent from "@/components/BoxComponent.vue";
import { useStore } from '@/store';
import { ADICIONA_TAREFA } from '@/store/tipo-mutacoes';

export default defineComponent({
  name: 'App',
  components: {
    BoxComponent,
    TarefaComponent,
    Formulario
  },
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
      //this.tarefas.push(tarefa);
      // if (!tarefa.projeto) {
      //   this.store.commit(NOTIFICAR, {
      //     titulo: 'Erro',
      //     texto: 'Ops! Não é possível salvar uma tarefa sem um projeto',
      //     tipo: TipoNotificacao.FALHA
      //   })
      //   return
      // }
      this.store.commit(ADICIONA_TAREFA, tarefa)
    },
  },

  setup () {
    const store = useStore()
    return {
      tarefas: computed(() => store.state.tarefas),
      store
    }
  }

});
</script>

<style>
.lista {
  padding: 1.5rem;
}

</style>
