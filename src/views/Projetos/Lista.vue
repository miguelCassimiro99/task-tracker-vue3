<template lang="pug">
section
  router-link.button(to="/projetos/novo")
    span.icon.is-small
      i.fas.fa-plus
    span Novo Projeto

  div(v-if="projetos && projetos.length > 0" )
    table.table.is-fullwidth
      thead
        tr
          th ID
          th Nome
          th Ações
      tbody
        tr(v-for="(projeto, index) in projetos" :key="index")
          td {{ projeto.id }}
          td {{ projeto.nome }}
          td
            router-link.button(:to="`/projetos/${projeto.id}`")
              span.icon.is-small
                i.fas.fa-pencil-alt
            button.button.ml-2.is-danger(@click="excluir(projeto.id)")
              span.icon.is-small
                i.fas.fa-trash
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import {useStore} from "@/store";
import useNotificador from "@/hooks/notificador"
import { OBTER_PROJETOS, REMOVER_PROJETO } from "@/store/tipo-acoes";
import { TipoNotificacao } from "@/interfaces/INotificacao";

export default defineComponent({
  name: 'ListView',
  methods: {
    excluir(id: string) {
      this.store.dispatch(REMOVER_PROJETO, id)
        .then(() => {
          this.notificar(TipoNotificacao.SUCESSO, 'Excelente', 'Projeto foi removido com sucesso')
        })
        .catch(() => {
          this.notificar(TipoNotificacao.FALHA, 'Falha', 'Não foi possível remover o projeto')
        })
    }
  },
  setup () {
    const store = useStore()
    const {notificar} = useNotificador()
    store.dispatch(OBTER_PROJETOS)
    return {
      projetos: computed(() => store.state.projetos),
      store,
      notificar
    }
  },
})
</script>

<style>

.projetos h1, .projetos .label {
  color: var(--text-primario);
  background: var(--bg-primario);
}

</style>
