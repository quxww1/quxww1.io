import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)


import index from './modules/index.js'
export default new vuex.Store({
    modules:{
        index:index
    }
})
