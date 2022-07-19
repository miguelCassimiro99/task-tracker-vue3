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
import {defineComponent, ref} from "vue";
import useNotificador from "@/hooks/notificador"
import { ALTERAR_PROJETO, CADASTRAR_PROJETOS } from "@/store/tipo-acoes";
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'FormularioView',
  props: {
    id: {
      type: String
    }
  },
  setup (props) {
    const store = useStore()
    const { notificar } = useNotificador()
    const router = useRouter()

    const nomeDoProjeto = ref("")
    if (props.id) {
      const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id)
      nomeDoProjeto.value = projeto?.nome || ''
    }

    const onSuccess = (action: string) => {
      nomeDoProjeto.value = '';
      router.push('/projetos')
      notificar(TipoNotificacao.SUCESSO, 'Excelente', `O projeto foi ${action} com sucesso`)
    }

    const onError = (action: string) => {
      nomeDoProjeto.value = '';
      router.push('/projetos')
      notificar(TipoNotificacao.FALHA, 'Falha', `Não foi possível ${action} o projeto`)
    }

    const salvarProjeto = ():void => {
      // para salvar um projeto é necessário antes definir como é o projeto

      if(props.id) store.dispatch(ALTERAR_PROJETO, {
        id: props.id,
        nome: nomeDoProjeto.value
      })
        .then(() => {
          onSuccess('alterado')
        })
        .catch(() => {
          onError('alterar')
        })

      if(!props.id) store.dispatch(CADASTRAR_PROJETOS, nomeDoProjeto.value)
        .then(() => {
          onSuccess('cadastrado')
        })
        .catch(err => {
          onError('cadastrar')
          console.log(err)
        })
    }

    return {
      nomeDoProjeto,
      salvarProjeto
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
