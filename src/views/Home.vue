<template lang="pug">
.home
  lv-hero
  lv-separador(alto='50')
  lv-titulo(titulo="Productos Destacados", subtitulo="Hecho solo para ti")
  .container
    lv-lista-productos(categoria="destacados", limite="6", auto=true)
  lv-separador(alto="30")
  lv-titulo(titulo="Hablan de Nostros", subtitulo="Nuestros Clientes")
  .comentarios
    .container
      .columns
        carousel(:perPage="3")
          slide(v-for="coment in comentarios" :key="coment.id" v-if="coment.activo")
            .column
              lv-comentario(:comentario="coment", :producto="true")
</template>

<script>
import lvHero from '@/components/layout/Hero'
import lvComentario from '@/components/Comentario/Comentario.vue'

import lvSeparador from '@/components/shared/Separador'
import lvTitulo from '@/components/shared/Titulo'

import lvListaProductos from '@/components/catalogo/ListaProductos'

import serverApiCatalogo from '@/services/catalogo/productos'

import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'Home',
  components: {
    lvHero, lvSeparador, lvTitulo, lvListaProductos, lvComentario, Carousel, Slide
  },
  data () {
    return {
      comentarios: []
    }
  },
  head: {
    title: {
      inner: 'Inicio'
    },
    meta: [
      {
        name: 'description', content: 'Loviz DelCarpio :: Bienvenidos a nuestra tienda Online. Envio Gratis a Todo el Peru por compras superiores a S/. 50.00'
      }
    ]
  },
  created () {
    serverApiCatalogo.getComentarioProducto()
    .then(res => {
      this.comentarios = res.results
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>

</style>
