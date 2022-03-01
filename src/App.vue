<template lang="pug">
main.columns.is-gapless.is-multiline
  .column.is-one-quarters
    BarraLateral
  .column.is-three-quarters
    Formulario
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from "@/components/BarraLateral.vue";
import Formulario from "@/components/Formulario.vue";

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    Formulario
  }

});
</script>

<style>

</style>
