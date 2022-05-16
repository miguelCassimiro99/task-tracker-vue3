<template lang="pug">
button(@click="clicado" :disabled="desabilitado")
  span.icon
    i.fas(:class="icon")
  span {{ texto }}
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  props: {
    texto: {
      type: String,
      required: true,
      default: 'botao'
    },
    icon: {
      type: String,
      required: false,
      default: 'fa-star'
    },
    desabilitado: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  emits: ['clicado'],
  methods: {
    clicado(): void {
      this.$emit('clicado');
    }
  }
});
</script>

<style scoped>

</style>
