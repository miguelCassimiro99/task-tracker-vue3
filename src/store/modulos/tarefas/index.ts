import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { Estado } from "@/store";
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA } from "@/store/tipo-acoes";
import { ADICIONA_TAREFA, ALTERA_TAREFA, EXCLUIR_TAREFA, DEFINIR_TAREFAS } from "@/store/tipo-mutacoes";
import { Module } from "vuex";


export interface EstadoDaTarefa {
  tarefas: ITarefa[]
}

export const tarefa: Module<EstadoDaTarefa, Estado> = {
  mutations: {
    //Tarefas
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa)
  },
    [ALTERA_TAREFA](state, tarefa:ITarefa) {
        const index = state.tarefas.findIndex(task => task.id === tarefa.id)
        state.tarefas[index] = tarefa
    },
    [EXCLUIR_TAREFA](state, descricao: string) {
        state.tarefas = state.tarefas.filter(task => task.descricao != descricao)
    },
    [DEFINIR_TAREFAS](state, tarefas:ITarefa[]) {
        state.tarefas = tarefas
    },
  },
  actions: {
    //tarefas
    [OBTER_TAREFAS] ({ commit }, filtro?: string) {

      let url = 'tarefas'

      if (filtro) {
        url += '?descricao=' + filtro
      }

      http.get(url)
          .then(res => {
              commit(DEFINIR_TAREFAS, res.data)
          })
    },
    async [CADASTRAR_TAREFA] ({commit}, tarefa: ITarefa) {
      const res = await http.post('tarefas', tarefa);
      return commit(ADICIONA_TAREFA, res.data);
    },
    [ALTERAR_TAREFA]({commit}, tarefa:ITarefa) {
      return http.put(`tarefas/${tarefa.id}`, tarefa)
          .then((res) => {
              commit(ALTERA_TAREFA, res.data)
          })
    },
  }
}