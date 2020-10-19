import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Content from '../components/Content.vue'
import User from '../components/User.vue'
import Kb from '../components/Kb.vue'
import Fb from '../components/Fb.vue'
import Material from '../components/Material.vue'
import Comments from '../components/Comments.vue'
import Home from '../view/Home.vue'
import Welcome from '../view/Welcome.vue'
import Login from '../view/Login.vue'
import Register from '../view/Register.vue'


const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', redirect: '/home' },
        {
            path: '/home', component: Home,
            redirect: '/welcome',
            children: [
                { path: '/welcome', component: Welcome },
                { path: '/content', component: Content },
                { path: '/user', ccomponent: User },
                { path: '/kb-manage', component: Kb },
                { path: '/fb-manage', component: Fb },
                { path: '/material', component: Material },
                { path: '/comments', component: Comments },
            ]
        },
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        { path: '/*', redirect: '/welcome' },

    ]
});

router.beforeEach((to, from, next) => {
    if (to.path === '/register') return next()
    if (to.path === '/login') return next()
    const mytoken = window.localStorage.getItem('token')
    if (!mytoken) return next('/login')
    next()
})
export default router