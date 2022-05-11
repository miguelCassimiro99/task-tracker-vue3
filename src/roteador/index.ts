import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import Tarefas from "@/views/Tarefas.vue";
import Projetos from "@/views/Projetos.vue";
import Formulario from "@/views/Projetos/Formulario.vue";

const rotas: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tarefas',
        component: Tarefas
    },
    {
        path: '/projetos',
        name: 'Projetos',
        component: Projetos
    },
    {
        path: '/projetos/novo',
        name: 'Novo Projeto',
        component: Formulario
    },
    {
        path: '/projetos/:id',
        name: 'Editar projeto',
        component: Formulario,
        props: true
        // props:true faz com que a rota possa receber a variavel que ela espera
        // utilizando a prop com o mesmo nome que está sendo utilizada pelo componente
    }
];

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
});

export default roteador;
