<template lang="pug">
.producto-review
  h1.title.has-text-centered Opiniones ({{producto.num_comentarios}})
    p
      a.button.is-black(@click="verComentario(true)") Danos tu Opinion
  .container(v-if="producto.num_comentarios>0")
    .columns.is-multiline
      .column.is-4
        lv-promedio(:comentarios="comentarios" :producto="producto")
      .column.is-8
        carousel(:perPage="2")
          slide(v-for="coment in comentarios" :key="coment.id")
            .column
              lv-comentario(:comentario="coment")
</template>

<script>
import {mapMutations} from 'vuex'

import { Carousel, Slide } from 'vue-carousel'

import lovizProductosService from '@/services/catalogo/productos'

import lvPromedio from '@/components/producto/Promedio.vue'
import lvComentario from '@/components/Comentario/Comentario.vue'

export default {
  components: {
    lvPromedio, Carousel, Slide, lvComentario
  },
  props: [
    'producto'
  ],
  data () {
    return {
      comentarios: [],
      redes: false
    }
  },
  methods: {
    ...mapMutations(['verComentario']),
    update () {
      lovizProductosService.getComentarioProducto(this.producto.id)
      .then(res => {
        this.comentarios = res.results
      })
    }
  },
  mounted () {
    this.update()
  },
  watch: {
    producto: 'update'
  }
}
</script>

<style lang="scss" scoped>
  .producto-review{
    .promedio{
      border-right: 1px solid #ccc;
    }
  }
</style>