import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: require('@/components/Dashboard').default
    },
    {
      path: '/config',
      name: 'config',
      component: require('@/components/Config').default
    },
    {
      path: '/repository/:id',
      name: 'repository',
      component: require('@/components/Repository').default,
      props: true
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
