import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home/home'
import Login from '../components/login/login'
import Main from '../components/main/main'
import Book from '../components/book/book'
import Note from '../components/note/note'
import Desc from '../components/desc/desc'
import Statistics from '../components/statistics/statistics'
import AllUsers from '../components/allUsers/allUsers'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      hidden: true
    },
    {
      path: '/',
      redirect: '/login',
      hidden: true
    },
    {
      path: '/home',
      name: '账本',
      component: Home,
      iconCls: 'icon-tools',
      leaf: false,
      children: [
        {path: '/main', component: Main, name: '主页'},
        {path: '/book', component: Book, name: '记账'},
        {path: '/note', component: Note, name: '记事'}
      ]
    },
    {
      path: '/home',
      name: '统计',
      component: Home,
      iconCls: 'icon-chart',
      leaf: true, // 是否只有一个节点
      children: [
        {path: '/statistics', component: Statistics, name: '统计'}
      ]
    },
    {
      path: '/home',
      name: '管理',
      component: Home,
      iconCls: 'icon-manage',
      leaf: false,
      children: [
        {path: '/allUsers', component: AllUsers, name: '用户查看'}
      ]
    },
    {
      path: '/home',
      name: '说明',
      component: Home,
      iconCls: 'icon-explain',
      leaf: true,
      children: [
        {path: '/desc', component: Desc, name: '说明'}
      ]
    }
  ]
})
