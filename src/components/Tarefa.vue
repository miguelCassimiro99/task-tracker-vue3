<template lang="pug">
BoxComponent
  .columns
    .column.is-7 {{ tarefa.descricao || 'Tarefa sem descrição' }}
    .column
      CronometroComponent(:tempo-em-segundos="tarefa.duracaoEmSegundos" )

</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import CronometroComponent from "@/components/Cronometro.vue";
import ITarefa from "@/interfaces/ITarefa";
import BoxComponent from "@/components/BoxComponent.vue";

export default defineComponent({
  name: 'TarefaComponent',
  components: {
    BoxComponent,
    CronometroComponent,
  },
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true,
    }
  }
})


</script>

<style scoped>

</style>
