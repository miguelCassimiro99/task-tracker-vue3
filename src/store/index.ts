import IProjeto from "@/interfaces/IProjeto";
import {createStore, Store, useStore as vuexUseStore } from "vuex";
import {InjectionKey} from "vue";
import { ADICIONA_PROJETO, ADICIONA_TAREFA, ALTERA_PROJETO, ALTERA_TAREFA, EXCLUIR_PROJETO, EXCLUIR_TAREFA, NOTIFICAR } from "./tipo-mutacoes";
import ITarefa from "@/interfaces/ITarefa";
import { INotificacao } from "@/interfaces/INotificacao";

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
        //Tarefas
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            tarefa.id = new Date().toISOString()
            state.tarefas.push(tarefa)
        },
        [ALTERA_TAREFA](state, tarefa:ITarefa) {
            const index = state.tarefas.findIndex(task => task.id === tarefa.id)
            state.tarefas[index] = tarefa
        },
        [EXCLUIR_TAREFA](state, descricao: string) {
            state.tarefas = state.tarefas.filter(task => task.descricao != descricao)
        },
        //Notificacao
        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = []
            }, 3000)
        }
    }
})

/*
* Para não termos que ficar chamando toda vez a Store
* dentro de cada componente, podemos definir uma função
* useStore que exporta um Store do tipo Estado (que definimos acima)
*/
export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}
