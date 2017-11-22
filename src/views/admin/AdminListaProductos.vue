<template lang="pug">
.container
  .card
    header.card-header
      p.card-header-title
        | Productos
      a.card-header-icon(href='#', aria-label='more options')
        span.icon
          i.fa.fa-search(aria-hidden='true')
    .card-content
      .columns.is-multiline
        .column.is-6(v-for="producto in productos")
          .box(@click="openProducto(producto.id)")
            article.media
              .media-left
                figure.image.is-64x64
                  img(:src='producto.thum1', alt='Image')
              .media-content
                .content
                  p
                    strong {{producto.texto_variacion}} 
                    small {{producto.nombre}}
                    small {{producto.date}}
    footer.card-footer
      a.card-footer-item(href='#') Ver Mas
</template>

<script>
import lovizApiProductoService from '@/services/catalogo/productos'

export default {
  components: {
  },
  data () {
    return {
      productos: [],
      prductoEdit: {},
      modal: false
    }
  },
  methods: {
    openProducto (id) {
      lovizApiProductoService.getProductoSingleAdmin(id)
      .then(res => {
        this.prductoEdit = res
      })
    }
  },
  created () {
    lovizApiProductoService.getProductos()
    .then(res => {
      this.productos = res.results
    })
  }
}
</script>

<style lang="scss" scoped>
.box{
  cursor: pointer;
}
</style>