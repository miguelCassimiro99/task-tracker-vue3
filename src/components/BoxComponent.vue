<template lang="pug">
.box.has-text-weight-bold(:style="estilos")
  slot
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'BoxComponent',
  data () {
    return {
      estilos: {
        backgroundColor: '#FAF0CA',
      }
    }
  }
})
</script>

<style scoped>
</style>
