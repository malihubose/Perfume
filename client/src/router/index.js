import Vue from 'vue'
import Router from 'vue-router'

import UserIndex from '@/components/User/index'
import UserEdit from '@/components/User/EditUser'
import UserCreate from '@/components/User/CreateUser'
import UserShow from '@/components/User/ShowUser'
import Login from '@/components/Login'

import ProductIndex from '@/components/Products/index'
import ProductCreate from '@/components/Products/CreateProduct'
import ProductShow from '@/components/Products/ShowProduct'
import ProductEdit from '@/components/Products/EditProduct'
import ProductAll from '@/components/Products/ShowAllProduct'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/users',
      name: 'users',
      component: UserIndex
    },
    {
      path: '/user/edit/:userId',
      name: 'user-edit',
      component: UserEdit
    },
    {
      path: '/user/create',
      name: 'user-create',
      component: UserCreate
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: UserShow
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/products',
      name: 'products',
      component: ProductIndex
    },
    {
      path: '/product/create',
      name: 'product-create',
      component: ProductCreate
    },
    {
      path: '/product/edit/:productId',
      name: 'product-edit',
      component: ProductEdit
    },
    {
      path: '/product/:productId',
      name: 'product',
      component: ProductShow
    },
    {
      path: '/allproduct',
      name: 'allproduct',
      component: ProductAll
    },
    
  ]
})
