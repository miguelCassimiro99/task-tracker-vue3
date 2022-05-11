<template lang="pug">
section.projetos
  h1.title Projetos

  router-link.button(to="/projetos/novo")
    span.icon.is-small
      i.fas.fa-plus
    span Novo Projeto

  div(v-if="projetos && projetos.length > 0" )
    table.table.is-fullwidth
      thead
        tr
          th ID
          th Nome
          th Ações
      tbody
        tr(v-for="(projeto, index) in projetos" :key="index")
          td {{ projeto.id }}
          td {{ projeto.nome }}
          td
            router-link.button(:to="`/projetos/${projeto.id}`")
              span.icon.is-small
                i.fas.fa-pencil-alt
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import {useStore} from "@/store";

export default defineComponent({
  name: 'ProjetosView',
  setup () {
    const store = useStore()
    return {
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
