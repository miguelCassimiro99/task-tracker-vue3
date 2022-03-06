<template lang="pug">
.box.has-text-weight-bold
  slot
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'BoxComponent',
})
</script>

<style scoped>
.box {
  background: #FAF0CA;
}
</style>
