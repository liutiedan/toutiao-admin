import Vue from 'vue'
import VueRouter from 'vue-router'
//  @ 表示 src 目录的别名，这样写的好处是不受当前文件路径影响
import Login from '@/views/login'
Vue.use(VueRouter)

//  路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
