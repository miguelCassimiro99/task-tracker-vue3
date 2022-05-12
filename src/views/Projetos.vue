<template lang="pug">
section.projetos
  h1.title Projetos
  router-view

  //O router view será responsável por exibir as rotas children do componente Projeto
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'ProjetosView',

})
</script>
<style scoped>
.projetos {
  padding: 1.25rem;
}
</style>


