<template lang="pug">
header
  h1
    img(src="../assets/logo.png")
  button.button(@click="alterarTema") {{ textoBotao }}
  nav.panel.mt-5
    ul.has-text-left
      li
        router-link.link(to="/")
          i.fas.fa-tasks.mr-1
          span Tarefas
      li
        router-link.link(to="/projetos")
          i.fas.fa-project-diagram
          span Projetos


</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BarraLateral',
  emits: ['aoTemaAlterado'],
  data () {
    return {
      modoEscuroAtivo: false,
    }
  },
  computed: {
    textoBotao(): string {
      if(this.modoEscuroAtivo) {
        return 'Desativar modo escuro';
      }
      return 'Ativar modo escuro'
    },
  },

  methods: {
    alterarTema():void {
      this.modoEscuroAtivo = !this.modoEscuroAtivo
      this.$emit('aoTemaAlterado', this.modoEscuroAtivo);
    }
  }
});

</script>

<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 1rem;
    height: auto;
  }
}
.panel li {
  margin: 8px 0;
}

.link {
  color: #fff;
  padding: 0.4rem 1rem;
}

.link:hover {
  color: #FAF0CA;
}

.link.router-link-active {
  color: #efbe00;
  border: 1px solid #efbe00;
  border-radius: 0.5rem;
}

</style>
