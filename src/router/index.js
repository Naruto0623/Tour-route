import Vue from 'vue'
import Router from 'vue-router'
import mainList from '@/components/mainList.vue'
import detail from '@/components/detail.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainList',
      component: mainList,
      meta: {
        title: '列表',
        back: false,
        edit: true,
        add: true
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail,
      meta: {
        title: '详情',
        back: true,
        edit: true,
        add: false
      }
    }
  ]
})
