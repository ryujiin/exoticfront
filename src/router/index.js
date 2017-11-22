import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import Producto from '@/views/producto/Producto'
import Perfil from '@/views/perfil/PageUser'
import Catalogo from '@/views/catalogo/CatalogoPage'
import Checkout from '@/views/Checkout'
import BuscarPage from '@/views/BuscarPage'

import FQS from '@/views/pages/FQS'
import Envio from '@/views/pages/EnvioPage'
import Terminos from '@/views/pages/Terminos'
import Sobre from '@/views/pages/Sobre'

import Felicidades from '@/views/checkout/Felicidad'

import AddVariacion from '@/views/admin/AgregarVariacion'

import PassReset from '@/views/perfil/UserResetPass'

import AdminListaProductos from '@/views/admin/AdminListaProductos'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/producto/:slug/',
      name: 'Producto',
      component: Producto
    },
    {
      path: '/perfil/',
      name: 'perfil',
      component: Perfil
    },
    {
      path: '/catalogo/:slug',
      name: 'catalogo',
      component: Catalogo
    },
    {
      path: '/checkout/',
      name: 'checkout',
      component: Checkout
    },
    {
      path: '/buscar/:query',
      name: 'buscar',
      component: BuscarPage
    },
    {
      path: '/preguntas-frecuentes',
      name: 'FQS',
      component: FQS
    },
    {
      path: '/info-envio',
      name: 'Envio',
      component: Envio
    },
    {
      path: '/terminos-y-condiciones',
      name: 'Terminos',
      component: Terminos
    },
    {
      path: '/sobre-nosotros',
      name: 'Sobre',
      component: Sobre
    },
    {
      path: '/password/reset/confirm/:uid/:token/',
      name: 'Password Reset',
      component: PassReset
    },
    {
      path: '/add/producto/:slug/',
      name: 'Add_Variacion',
      component: AddVariacion
    },
    {
      path: '/gracias/:numero_pedido/',
      name: 'Felicidades',
      component: Felicidades
    },
    {
      path: '/admin/productos',
      name: 'AdminListaProductos',
      component: AdminListaProductos
    }
  ]
})
