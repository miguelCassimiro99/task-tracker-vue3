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
import {defineComponent} from "vue";
import useNotificador from "@/hooks/notificador"
import { ALTERAR_PROJETO, CADASTRAR_PROJETOS } from "@/store/tipo-acoes";

export default defineComponent({
  name: 'FormularioView',
  props: {
    id: {
      type: String
    }
  },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projeto.projetos.find(proj => proj.id == this.id)
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

      if(this.id) this.store.dispatch(ALTERAR_PROJETO, {
        id: this.id,
        nome: this.nomeDoProjeto
      })
        .then(() => {
          this.onSuccess('alterado')
        })
        .catch(() => {
          this.onError('alterar')
        })

      if(!this.id) this.store.dispatch(CADASTRAR_PROJETOS, this.nomeDoProjeto)
        .then(() => {
          this.onSuccess('cadastrado')
        })
        .catch(err => {
          this.onError('cadastrar')
          console.log(err)
        })
    },
    onSuccess(action: string) {
      this.nomeDoProjeto = '';
      this.$router.push('/projetos')
      this.notificar(TipoNotificacao.SUCESSO, 'Excelente', `O projeto foi ${action} com sucesso`)
    },
    onError(action: string) {
      this.nomeDoProjeto = '';
      this.$router.push('/projetos')
      this.notificar(TipoNotificacao.FALHA, 'Falha', `Não foi possível ${action} o projeto`)
    }
  },
  setup () {
    const store = useStore()
    const { notificar } = useNotificador()
    return {
      store,
      notificar
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
