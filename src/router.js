import Vue from 'vue'
import VueRouter from 'vue-router'

const Index = () =>
  import('./pages/index.vue')

const List = () =>
  import('./pages/list.vue')


const Add = () =>
  import('./pages/add.vue')

const Edit = () =>
  import('./pages/edit.vue')

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [{
      path: '/',
      component: Index,
      children: [{
          path: '/',
          component: List
        },
        {
          path: 'add',
          component: Add
        },
        {
          path: 'edit',
          component: Edit
        },

      ]
    }

  ]
})