<template lang="pug">
section.projetos
  h1.title Projetos
  form(@submit.prevent="salvarProjeto")
    .field
      label.label(for="nomeDoProjeto") Nome do Projeto
      input.input(type="text" id="nomeDoprojeto" v-model="nomeDoProjeto")
    .field
      button.button(type="submit") Salvar
  hr
  div(v-if="projetos.length > 0" )
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useStore} from "@/store";

export default defineComponent({
  name: 'FormularioView',
  data() {
    return {
      nomeDoProjeto: '',
    };
  },
  methods: {
    salvarProjeto ():void {
      // para salvar um projeto é necessário antes definir como é o projeto
      this.store.commit('ADICIONA_PROJETO', this.nomeDoProjeto)
      this.nomeDoProjeto = '';
      this.$router.push('/projetos')
    }
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
