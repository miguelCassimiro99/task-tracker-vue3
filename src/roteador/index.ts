import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import Tarefas from "@/views/TarefasLista.vue";
import Projetos from "@/views/Projetos.vue";
import Formulario from "@/views/Projetos/Formulario.vue";
import Lista from "@/views/Projetos/Lista.vue";

const rotas: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tarefas',
        component: Tarefas
    },
    {
        path: '/projetos',
        component: Projetos,
        children: [
            {
                path: '',
                name: 'Projetos',
                component: Lista
            },
            {
                path: 'novo',
                name: 'Novo Projeto',
                component: Formulario
            },
            {
                path: ':id',
                name: 'Editar projeto',
                component: Formulario,
                props: true
                // props:true faz com que a rota possa receber a variavel que ela espera
                // utilizando a prop com o mesmo nome que está sendo utilizada pelo componente
            }
            // Children serve para aninhamento das rotas
        ]
    }
];

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
});

export default roteador;
