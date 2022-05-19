<template lang="pug">
BoxComponent
  .columns(@click="tarefaClicada")
    .column.is-4 {{ tarefa.descricao || 'Tarefa sem descrição' }}
    .column.is-3 {{ tarefa.projeto?.nome || 'Sem projeto' }}
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
  emitis: ['aoTarefaClicada'],
  components: {
    BoxComponent,
    CronometroComponent,
  },
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true,
    }
  },
  methods: {
    tarefaClicada(): void {
      this.$emit('aoTarefaClicada', this.tarefa)
    }
  }
})


</script>

<style scoped>
.columns {
  cursor: pointer;
}
</style>
