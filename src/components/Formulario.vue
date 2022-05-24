<template lang="pug">
.box.formulario
  .columns
    .column.is-5(
      role="form"
      aria-label="Formulario para adicionar nova classe"
    )
      input(
        class="input"
        placeholder="Qual task deseja cronometrar?"
        v-model="descricaoDaTarefa"
      )
    .column.is-3
      .select
        select(v-model="projetoId")
          option(value="") Selecione o Projeto
          option(
            v-for="(projeto, index) in projetos"
            :key="index"
            :value="projeto.id"
          ) {{ projeto.nome }}
    .column
      Temporizador(@aoTemporizadorFinalizado="finalizarTarefa")

</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import Temporizador from "@/components/Temporizador.vue";
import {useStore} from "vuex";
import {key} from "@/store";

export default defineComponent({
  name: 'FormularioComponent',
  emits: ['aoSalvarTarefa'],
  components: {
    Temporizador,
  },
  setup (props, { emit }) {
    const store = useStore(key)
    
    const descricaoDaTarefa = ref('')
    const projetoId = ref('')

    const projetos = computed(() =>  store.state.projeto.projetos )

    const finalizarTarefa = (tempoDecorrido: number): void => {
      emit('aoSalvarTarefa', {
        duracaoEmSegundos: tempoDecorrido,
        descricao: descricaoDaTarefa.value,
        projeto: projetos.value.find(p => p.id == projetoId.value)
      })
      descricaoDaTarefa.value = '';
    }
    
    return {
      descricaoDaTarefa,
      projetoId,
      projetos,
      finalizarTarefa
    }
  }
});
</script>

<style>
.formulario {
  color: var(--text-primario);
  background: var(--bg-primario);
}

</style>
