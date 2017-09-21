import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home/home'
import Login from '../components/login/login'
import Main from '../components/main/main'
import Book from '../components/book/book'
import Note from '../components/note/note'
import Desc from '../components/desc/desc'
import Statistics from '../components/statistics/statistics'

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
      path: '/',
      name: '统计',
      component: Home,
      iconCls: 'icon-chart',
      leaf: false, // 是否只有一个节点
      children: [
        {path: '/statistics', component: Statistics, name: '统计'}
      ]
    },
    {
      path: '/',
      name: '说明',
      component: Home,
      iconCls: 'icon-explain',
      leaf: false,
      children: [
        {path: '/desc', component: Desc, name: '说明'}
      ]
    }
  ]
})
