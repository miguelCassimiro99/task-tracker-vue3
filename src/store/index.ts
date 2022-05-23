import {createStore, Store, useStore as vuexUseStore } from "vuex";
import {InjectionKey} from "vue";
import { INotificacao } from "@/interfaces/INotificacao";
import { EstadoDoProjeto, projeto } from "./modulos/projetos";
import { NOTIFICAR } from "./tipo-mutacoes";
import { EstadoDaTarefa, tarefa } from "./modulos/tarefas";

export interface Estado {
    tarefa: EstadoDaTarefa
    notificacoes: INotificacao[],
    projeto: EstadoDoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore <Estado>({
    state: {
        tarefa: {
            tarefas: [],
        },
        notificacoes: [],
        projeto: {
            projetos: []
        }
    },
    mutations: {
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
    },
    modules: {
        projeto,
        tarefa
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
