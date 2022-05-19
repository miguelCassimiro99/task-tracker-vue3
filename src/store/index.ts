import IProjeto from "@/interfaces/IProjeto";
import {createStore, Store, useStore as vuexUseStore } from "vuex";
import {InjectionKey} from "vue";
import { ADICIONA_PROJETO, ADICIONA_TAREFA, ALTERA_PROJETO, ALTERA_TAREFA, DEFINIR_PROJETOS, DEFINIR_TAREFAS, EXCLUIR_PROJETO, EXCLUIR_TAREFA, NOTIFICAR } from "./tipo-mutacoes";
import ITarefa from "@/interfaces/ITarefa";
import { INotificacao } from "@/interfaces/INotificacao";
import { ALTERAR_PROJETO, ALTERAR_TAREFA, CADASTRAR_PROJETOS, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS, REMOVER_PROJETO } from "./tipo-acoes";
import http from '@/http'

interface Estado {
    projetos: Array<IProjeto>
    tarefas: ITarefa[]
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore <Estado>({
    state: {
        projetos: [],
        tarefas: [],
        notificacoes: []
    },
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
        //Notificacao
        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = []
            }, 3000)
        }
    },
    actions: {
        //tarefas
        [OBTER_TAREFAS] ({ commit }) {
            http.get('tarefas')
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
        //projetos
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
    },
})

/*
* Para não termos que ficar chamando toda vez a Store
* dentro de cada componente, podemos definir uma função
* useStore que exporta um Store do tipo Estado (que definimos acima)
*/
export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}
