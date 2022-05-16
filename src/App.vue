<template lang="pug">
main.columns.is-gapless.is-multiline(:class="{ 'modo-escuro': modoEscuroAtivo }")
  .column.is-one-quarters
    BarraLateral(@aoTemaAlterado="trocarTema")
  .column.is-three-quarters.conteudo
    // aqui vai a página da rota acessada
    NotificacoesComponent
    router-view
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from "@/components/BarraLateral.vue";
import NotificacoesComponent from "@/components/NotificacoesComponent.vue"

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    NotificacoesComponent
  },
  data() {
    return {
      modoEscuroAtivo: false,
    }
  },
  methods: {
    trocarTema(modoEscuroAtivo: boolean): void {
      this.modoEscuroAtivo = modoEscuroAtivo;
    }
  }

});
</script>

<style>

main {
  --bg-primario: #fff;
  --text-primario: #000;
}

main.modo-escuro {
  --bg-primario: #2b2d42;
  --text-primario: #ddd;
}

.conteudo {
  background: var(--bg-primario);
}

</style>
