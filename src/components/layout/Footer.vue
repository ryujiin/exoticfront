<template lang="pug">
  footer
    .main-footer
      .container
        .columns
          .column.is-6.has-text-centered
            figure.logo
              img(src="/static/img/logooso.png" alt="Loviz DelCarpio" v-if="getTienda.logo")
              .title.is-1(v-else) {{getTienda.nombre}}
          .column.is-2
            .f_menu
              p.menulabel Ayuda
              ul.menu-list
                li
                  a {{getTienda.telefono}}
                li
                  router-link(:to={name:'FQS'}) Preguntas Frecuentes
                li
                  router-link(:to={name: 'Envio'}) Informacion de Envio 
                li
                  router-link(:to={name: 'Terminos'}) Términos y Condiciones
          .column.is-2
            .f_menu
              p.menulabel Acerca de {{getTienda.nombre}}
              ul.menu-list
                li
                  router-link(:to={name: 'Sobre'}) Sobre Nosotros
                li
                  a Comentarios de Nuestros Clientes
          .column.is-2
            .f_menu
              p.menulabel Enlaces de Interes
              ul.menu-list
                li
                  a Novedades
                li
                  a Glosario de Terminos
                li
                  router-link(to='/catalogo/oferta') Ofertas
    .subfooter
      .container
        .copyright.has-text-centered
          p © 2017 Loviz DelCarpio Inc. Todos los derechos reservados.
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters(['getTienda'])
  }
}
</script>


<style lang="scss" scoped>
footer{
  margin-top: 30px;
  .main-footer{
    background-color: #000;
    color: #fff;
    .container{
      padding-top: 83px;
      padding-bottom: 10px;
    }
    .logo{
      margin: 0 auto;
      img{
        width: 185px;
      }
    }
    .f_menu{
      .menulabel{
        text-transform: uppercase;
        color: #fff;
        font-weight: 600;
        font-size: 13px;
      }
      .menu-list{
        color: #ccc;
        font-size: 13px;
        a{
          color: #ccc;
          padding:3px;
        }
        li:hover{
          a{
            background: none;
            color: #fff;
          }
        }
      }
    }
  }
  .subfooter{
    background-color: #000;
    font-size: 0.7em;
    .container{
      padding: 20px 0;
      border-top: 1px solid #192126;
    }
    .copyright{
      color: #ccc;
    }
  }
  .title{
    color: #fff;
  }
}
</style>