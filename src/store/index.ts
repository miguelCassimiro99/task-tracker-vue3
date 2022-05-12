import IProjeto from "@/interfaces/IProjeto";
import {createStore, Store, useStore as vuexUseStore } from "vuex";
import {InjectionKey} from "vue";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO } from "./tipo-mutacoes";

interface Estado {
    projetos: Array<IProjeto>
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore <Estado>({
    state: {
        projetos: []
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
