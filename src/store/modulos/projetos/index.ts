import http from "@/http";
import IProjeto from "@/interfaces/IProjeto";
import { Estado } from "@/store";
import { OBTER_PROJETOS, CADASTRAR_PROJETOS, ALTERAR_PROJETO, REMOVER_PROJETO } from "@/store/tipo-acoes";
import { ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETOS, EXCLUIR_PROJETO } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoDoProjeto {
  projetos: IProjeto[]
}

/* 
  Um módulo do Vuex precisamos criar uma interface
  que representa um estado deste módulo (ex: IProjeto),
  a constante projeto, por se tratar de um módulo do Vuex,
  precisa receber duas informações:
  - Estado do módulo
  - Estado global
  Para isso foi criada a interface Estado do Projeto, que é uma array de itens do tipo IProjeto e o estado global
  sendo no Estado exportado do nosso /store/index
*/
export const projeto: Module<EstadoDoProjeto, Estado> = {
  mutations: {
    [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
      const projeto = {
          id: new Date().toISOString(),
          nome: nomeDoProjeto
      } as IProjeto
      state.projetos.push(projeto)
    },
    [ALTERA_PROJETO](state, projeto:IProjeto) {
        const index = state.projetos.findIndex(proj => proj.id === projeto.id)
        state.projetos[index] = projeto
    },
    [EXCLUIR_PROJETO](state, id) {
        state.projetos = state.projetos.filter(proj => proj.id != id)
    },
    [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
        state.projetos = projetos
    },
  },
  actions: {
    [OBTER_PROJETOS] ({ commit }) {
      http.get('projetos')
          .then(res => {
              commit(DEFINIR_PROJETOS, res.data)
          })
    },
    [CADASTRAR_PROJETOS] (context, nomeDoProjeto: string) {
        return http.post('projetos', {
            nome: nomeDoProjeto
        })
    },
    [ALTERAR_PROJETO] (context, projeto: IProjeto) {
        return http.put(`projetos/${projeto.id}`, projeto)
    },
    [REMOVER_PROJETO] ({commit}, id: string) {
        return http.delete(`projetos/${id}`)
            .then(() => {
                commit(EXCLUIR_PROJETO, id)
            })
    }
  }
}