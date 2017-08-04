import Vue from 'vue'
import Router from 'vue-router'
import sIndex from '../components/s_index.vue'
import sPay from '../components/s_pay.vue'

Vue.use(Router)


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: sIndex
    },
    {
      path: '/s_pay',
      component: sPay
    }
  ]
})
