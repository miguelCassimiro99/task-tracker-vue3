<template lang="pug">
section
  form(@submit.prevent="salvarProjeto")
    .field
      label.label(for="nomeDoProjeto") Nome do Projeto
      input.input(type="text" id="nomeDoprojeto" v-model="nomeDoProjeto")
    .field
      button.button(type="submit") Salvar
  hr
</template>

<script lang="ts">
import { TipoNotificacao } from "@/interfaces/INotificacao";
import {useStore} from "@/store";
import { ALTERA_PROJETO, ADICIONA_PROJETO } from "@/store/tipo-mutacoes";
import {defineComponent} from "vue";
import { notificacaoMixin } from '@/mixins/notificar'

export default defineComponent({
  name: 'FormularioView',
  props: {
    id: {
      type: String
    }
  },
  mixins: [notificacaoMixin],
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find(proj => proj.id === this.id)
      this.nomeDoProjeto = projeto?.nome || ''
    }
  },
  data() {
    return {
      nomeDoProjeto: '',
    };
  },
  methods: {
    salvarProjeto ():void {
      // para salvar um projeto é necessário antes definir como é o projeto

      if(this.id) this.store.commit(ALTERA_PROJETO, {
        id: this.id,
        nome: this.nomeDoProjeto
      })

      if(!this.id) this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto)

      this.nomeDoProjeto = '';
      this.$router.push('/projetos')

      this.notificar(TipoNotificacao.SUCESSO, 'Excelente', 'O projeto foi salvo com sucesso')
    },
  },
  setup () {
    const store = useStore()
    return {
      store,
    }
  },
})
</script>

<style>
.projetos {
  padding: 1.25rem;
}

.projetos h1, .projetos .label {
  color: var(--text-primario);
  background: var(--bg-primario);
}

</style>
