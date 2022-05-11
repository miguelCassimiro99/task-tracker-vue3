<template lang="pug">
section.projetos
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
