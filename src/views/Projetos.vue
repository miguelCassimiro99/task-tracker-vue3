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
    table.table.is-fullwidth
      thead
        tr
          th ID
          th Nome
      tbody
        tr(v-for="(projeto, index) in projetos" :key="index")
          td {{ projeto.id }}
          td {{ projeto.nome }}
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import {useStore} from "@/store";

export default defineComponent({
  name: 'ProjetosView',
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
    }
  },
  setup () {
    const store = useStore()
    return {
      store,
      projetos: computed(() => store.state.projetos)
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
