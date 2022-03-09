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
import {defineComponent} from "vue";
import IProjeto from "@/interfaces/IProjeto";

export default defineComponent({
  name: 'ProjetosView',
  data() {
    return {
      nomeDoProjeto: '',
      projetos: [] as IProjeto[],
    };
  },
  methods: {
    salvarProjeto ():void {
      // para salvar um projeto é necessário antes definir como é o projeto
      const projeto: IProjeto = {
        nome: this.nomeDoProjeto,
        id: new Date().toISOString()
      }
      this.projetos.push(projeto);
      this.nomeDoProjeto = '';
    }
  }
})
</script>

<style scoped>
.projetos {
  padding: 1.25rem;
}

</style>
