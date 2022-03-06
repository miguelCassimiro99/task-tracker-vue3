<template lang="pug">
.is-flex.is-justify-content-space-between.is-align-items-center
  Cronometro(:tempo-em-segundos="tempoEmSegundos")
  BotaoCronometro(
    @clicado="iniciar"
    :desabilitado="cronometroRodando"
    texto="Play"
    icon="fa-play"
  )
  BotaoCronometro(
    @clicado="finalizar"
    :desabilitado="!cronometroRodando"
    texto="Stop"
    icon="fa-stop"
  )
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Cronometro from "@/components/Cronometro.vue";
import BotaoCronometro from "@/components/BotaoCronometro.vue";

export default defineComponent({
  name: 'TemporizadorComponent',
  emits: ['aoTemporizadorFinalizado'],
  components: {
    Cronometro,
    BotaoCronometro
  },

  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      cronometroRodando: false,
    }
  },

  methods: {
    iniciar(): void {
      this.cronometroRodando = true;
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos += 1;
      }, 1000);
    },

    finalizar(): void {
      this.cronometroRodando = false;
      clearInterval(this.cronometro);
      this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos);
      this.tempoEmSegundos = 0;
    }
  }
});
</script>

<style scoped>

</style>
