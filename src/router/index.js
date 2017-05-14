import Vue from 'vue'
import VueRouter from 'vue-router'
import cookies from 'js-cookie'
import store from '../store/'
import * as types from '../store/mutation-types'

Vue.use(VueRouter)

const scrollBehavior = (to) => {
    const position = {}
    position.x = 0
    position.y = 0
    return position
}


const login = resolve => {
    require.ensure(['components/login/login.vue'], () => {
        resolve(require('components/login/login.vue'))
    }, 'user')
}

const fullpage = resolve => {
    require.ensure(['components/common/fullpage.vue'], () => {
        resolve(require('components/common/fullpage.vue'))
    }, 'user')
}

const scroll = resolve => {
    require.ensure(['components/examples/scroll.vue'], () => {
        resolve(require('components/examples/scroll.vue'))
    }, 'user')
}

const top = resolve => {
    require.ensure(['components/top/top.vue'], () => {
        resolve(require('components/top/top.vue'))
    }, 'top')
}

const main = resolve => {
    require.ensure(['components/main/index.vue'], () => {
        resolve(require('components/main/index.vue'))
    }, 'main')
}

const lottery = resolve => {
    require.ensure(['components/lottery/lottery.vue'], () => {
        resolve(require('components/lottery/lottery.vue'))
    }, 'lottery')
}

const firstPage = resolve => {
    require.ensure(['components/main/first-page.vue'], () => {
        resolve(require('components/main/first-page.vue'))
    }, 'main')
}



const router = new VueRouter({
    mode: 'hash',
    base: '/',
    scrollBehavior,
    routes: [
        { name:'index', path: '/', component: login },
        { name:'login', path: '/login', component: login },
        { name:'fullpage', path: '/fullpage', component: fullpage },
        { name:'scroll', path: '/scroll', component: scroll },
        {  path: '/main', component: main,
            children: [
                { name:'main', path: '', component: firstPage },
                { name:'lottery', path: 'lottery/:id', component: lottery },
            ]
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.length > 0) {
        if(to.path.indexOf("/main/lottery") > -1){
            store.commit(types.SET_CURRENTLOTTERY, to.params.id)
        }
       next()
   } else {
       next({name: "login"})
   }
})

export default router

