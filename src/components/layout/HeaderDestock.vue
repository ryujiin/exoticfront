<template lang="pug">
nav.navbar.header(role='navigation', aria-label='main navigation')
  .container
    .navbar-brand
      router-link.navbar-item(to='/')
        img(src="/static/img/logonegro.png" height="28" v-if="getTienda.logo")
        .title(v-else) {{getTienda.nombre}}
    .navbar-item.has-dropdown.is-hoverable(v-for="item in getTienda.menuTop" key="item.id")
      router-link.navbar-link(:to="item.link")
        | {{item.texto}}
        .navbar-dropdown.is-boxed(v-if="item.hijos")
          router-link.navbar-item(v-for="item in item.hijos", :to="item.link", key="item.id")
            | {{item.texto}}
    .navbar-end
      a.navbar-item(@click="changeTiendaBusqueda")
        span.icon
          i.fa.fa-search
        span Buscar
      router-link.navbar-item.italic(v-if="getPerfil.id" to="/perfil/")
        span {{getPerfil.first_name}} {{getPerfil.last_name}}
        span.icon.is-large
          i.fa.fa-user-o.fa-lg
      a.navbar-item.italic.user(v-else @click="changeModalLogin(true)")
        span Ingresar / Registrar
        span.icon.is-large
          i.fa.fa-user-o.fa-lg
      a.navbar-item
        lv-cart-button
      .navbar-item.has-dropdown.is-hoverable(v-if="getPerfil.staff")
        a.navbar-link(href='/admin/productos/')
          | Admin
        .navbar-dropdown.is-boxed
          router-link.navbar-item(to='/admin/productos/')
            | Productos
          a.navbar-item(href='https://bulma.io/documentation/modifiers/syntax/')
            | Modifiers
          a.navbar-item(href='https://bulma.io/documentation/columns/basics/')
            | Columns
          a.navbar-item(href='https://bulma.io/documentation/layout/container/')
            | Layout
          a.navbar-item(href='https://bulma.io/documentation/form/general/')
            | Form
          hr.navbar-divider
          a.navbar-item(href='https://bulma.io/documentation/elements/box/')
            | Elements
          a.navbar-item.is-active(href='https://bulma.io/documentation/components/breadcrumb/')
            | Components
</template>
<script>
import {mapMutations, mapGetters} from 'vuex'
import lvBusqueda from '@/components/shared/CajaBusqueda'
import lvCartButton from '@/components/layout/CartButton.vue'

export default {
  name: 'HeaderMovil',
  components: {
    lvBusqueda, lvCartButton
  },
  computed: {
    ...mapGetters(['getCartNow', 'getPerfil', 'getTienda'])
  },
  methods: {
    ...mapMutations(['changeCartSlide', 'changeModalLogin', 'changeTiendaBusqueda'])
  }
}
</script>

<style lang="scss" scoped>
.navbar{
  z-index: 10;
  min-height: 4.25rem;
}
.navbar-item {
  text-transform: uppercase;
  img{
    max-height: 3.75rem;
  } 
}
.navbar-link::after{
  border-color: #111;
}
.header{
  box-shadow: 0 2px 5px rgba(0,0,0,.16);
  a{
    color: #000;
  }
  .navbar-brand{
    a:hover{
      background-color: #fff
    }
  }
}
.user{
  text-transform: capitalize;
}
</style>
