import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Play from '@/pages/play/play'
import img from '@/pages/img'

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
      path: '/img',
      name: 'img',
      component: img
    }
  ]
})
