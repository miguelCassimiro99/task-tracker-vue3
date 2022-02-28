<template>
  <div class="box">
    <div class="columns">
      <div
          class="column is-8"
          role="form"
          aria-label="Formulario para adicionar uma nova task"
      >
        <label>
          <input
              class="input"
              placeholder="Qual tarefa deseja cronometrar?"
          >
        </label>
      </div>
      <div class="column">
        <div class="is-flex is-justify-content-space-between is-align-items-center">
          <section>
            <strong> 00:00:00 </strong>
          </section>

          <button>
          <span class="icon">
            <i class="fas fa-play"></i>
          </span>
            <span>Play</span>
          </button>

          <button>
          <span class="icon">
            <i class="fas fa-stop"></i>
          </span>
            <span>Stop</span>
          </button>

        </div>
      </div>
    </div>

  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormularioComponent',
});
</script>

<style scoped>

</style>
