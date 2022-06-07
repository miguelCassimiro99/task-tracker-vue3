<template lang="pug">
Formulario(@aoSalvarTarefa="salvarTarefa")
.lista
  section.mb-3
      .field
        p.control.has-icons-left.has-icons-right
          input.input(type="text" placeholder="filtrar tarefas" v-model="filtro")
          span.icon.is-small.is-left
            i.fas.fa-search
          span.icon.is-small.is-right
            i.fas.fa-check
  
  BoxComponent.is-flex.is-justify-content-start.is-align-items-center(
    v-if="!tarefas || tarefas.length === 0"
  )
    h1 Você não realizou nenhuma tarefa hoje
    i.ml-2.fas.fa-face-frown

  TarefaComponent(
    v-else
    @aoTarefaClicada="selecionarTarefa"
    v-for="(tarefa, index) in tarefas"
    :tarefa="tarefa"
    :key="index"
    :descricao="tarefa.descricao"
    :duracao="tarefa.duracaoEmSegundos"
  )

  //-Modal
  .modal(:class="{ 'is-active': tarefaSelecionada }" v-if="tarefaSelecionada")
    .modal-background
    .modal-card
      header.modal-card-head
        p.modal-card-title Editar tarefa
        button.delete(aria-label="close" @click="fecharModal")
      section.modal-card-body
        .field
          label.label(for="descricaoDataTarefa") Descrição da tarefa
          input.input(
            type="text"
            id="descricaoDataTarefa"
            v-model="tarefaSelecionada.descricao"
          )
      footer.modal-card-foot
        button.button.is-success(@click="atualizarTarefa(tarefaSelecionada)") Salvar alterações
        button(@click="fecharModal").button Cancelar
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import Formulario from "@/components/Formulario.vue";
import TarefaComponent from "@/components/Tarefa.vue";
import ITarefa from "@/interfaces/ITarefa";
import BoxComponent from "@/components/BoxComponent.vue";
import { useStore } from '@/store';
import useNotificador from "@/hooks/notificador"
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipo-acoes';

export default defineComponent({
  name: 'App',
  components: {
    BoxComponent,
    TarefaComponent,
    Formulario
  },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null
    }
  },
  methods: {
    atualizarTarefa(tarefa: ITarefa): void {
      if (!tarefa) return
      this.store.dispatch(ALTERAR_TAREFA, tarefa)
        .then(() => {
          this.notificar(TipoNotificacao.SUCESSO, 'Pronto', 'Tarefa atualizada')
          this.fecharModal()
        })
        .catch(() => this.notificar(TipoNotificacao.FALHA, 'Ops', 'Não foi possível atualizar esta tarefa'))
    },

    fecharModal():void {
      this.tarefaSelecionada = null
    },
    selecionarTarefa(tarefa: ITarefa): void {
      this.tarefaSelecionada = tarefa
    },
    salvarTarefa(tarefa: ITarefa): void {

      if (!tarefa.projeto) {
        return this.notificar(TipoNotificacao.FALHA, 'Falha', 'Não é possível finalizar uma tarefa sem um projeto')
      }
      this.store.dispatch(CADASTRAR_TAREFA, tarefa)
        .then(() => this.notificar(TipoNotificacao.SUCESSO, 'Excelente', 'Você finalizou uma tarefa'))
        .catch(() => this.notificar(TipoNotificacao.FALHA, 'Ops', 'Não foi possível cadastrar esta tarefa'))
    },
  },

  setup () {
    const store = useStore()
    const {notificar} = useNotificador()
    store.dispatch(OBTER_TAREFAS)
    store.dispatch(OBTER_PROJETOS)

    const filtro = ref("")

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value)
    })

    return {
      tarefas: computed(() => store.state.tarefa.tarefas),
      store,
      notificar,
      filtro
    }
  }

});
</script>

<style>
.lista {
  padding: 1.5rem;
}

</style>
