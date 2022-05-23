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
import {computed, defineComponent} from 'vue';
import Temporizador from "@/components/Temporizador.vue";
import {useStore} from "vuex";
import {key} from "@/store";

export default defineComponent({
  name: 'FormularioComponent',
  emits: ['aoSalvarTarefa'],
  components: {
    Temporizador,
  },
  data() {
    return {
      descricaoDaTarefa: '',
      projetoId: '',
    }
  },
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      this.$emit('aoSalvarTarefa', {
        duracaoEmSegundos: tempoDecorrido,
        descricao: this.descricaoDaTarefa,
        projeto: this.projetos.find(p => p.id == this.projetoId)
      })
      this.descricaoDaTarefa = '';
    }
  },
  setup () {
    const store = useStore(key)
    return {
      projetos: computed(() =>  store.state.projeto.projetos )
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
