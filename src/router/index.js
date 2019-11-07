import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Play from '@/pages/play/play'
import look from '@/pages/look/look'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'play',
      component: Play
    },
    {
      path: '/look',
      name: 'look',
      component: look
    }
  ]
})
