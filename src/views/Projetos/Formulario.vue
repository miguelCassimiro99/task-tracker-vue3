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
</template>

<script lang="ts">
import {useStore} from "@/store";
import {defineComponent} from "vue";

export default defineComponent({
  name: 'FormularioView',
  props: {
    id: {
      type: String
    }
  },
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

      if(this.id) this.store.commit('ALTERA_PROJETO', {
        id: this.id,
        nome: this.nomeDoProjeto
      })

      if(!this.id) this.store.commit('ADICIONA_PROJETO', this.nomeDoProjeto)

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
