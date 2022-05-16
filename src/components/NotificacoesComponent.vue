<template lang="pug">
.notificacoes
  article.message(
      v-for="(notificacao, index) in notificacoes"
      :key="index"
      :class="contexto[notificacao.tipo]"
    )
    .message-header {{ notificacao.titulo }}
    .message-body {{ notificacao.texto }}

</template>

<script lang="ts">
import { TipoNotificacao } from '@/interfaces/INotificacao'
import { useStore } from '@/store'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'NotificacoesComponent',
  data () {
    return {
      contexto: {
        [TipoNotificacao.SUCESSO]: 'is-success',
        [TipoNotificacao.FALHA]: 'is-danger',
        [TipoNotificacao.ATENCAO]: 'is-warning',
      }
    }
  },
  setup () {
    const store = useStore()
    return {
      notificacoes: computed(() => store.state.notificacoes)
    }
  }
})
</script>

<style scoped>
.notificacoes {
  right: 0;
  position: absolute;
  padding: 8px;
  width: 800px;
  width: 300px;
  z-index: 10;
}
@media (max-width: 768px) {
  .notificacoes {
    bottom: 0;
  }
}
</style>
