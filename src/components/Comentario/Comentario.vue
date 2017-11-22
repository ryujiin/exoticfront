<template lang="pug">
.comentario
  .card
    .card-content
      .media
        .media-left
          .image.is-48x48
            img.img_profile(:src='comentario.thum_user' v-if="comentario.thum_user")
            img.img_profile(src='/static/img/avatar.png', v-else)
        .media-content
          p.title.is-4(v-if="comentario.nombre") {{comentario.nombre}}
          p.title.is-4(v-else) Anonimo
          p.subtitle.is-6
            span.icon.has-text-warning(v-for="s in comentario.valoracion")
              i.fa.fa-star
      .content
        | {{comentario.comentario}} 
        a #AmoLovizDc
        br
        carousel(:perPage="3" v-if="comentario.fotos_comentario" :autoplay="true" :paginationEnabled="false")
          slide(v-for="foto in comentario.fotos_comentario" :key="foto.id")
            .image(@click="changeModalFoto(true), changeFotoComent(foto.foto)")
              img(:src="foto.foto")
        time.italic(datetime='2016-1-1') Hace {{comentario.creado}}
    footer.card-footer(v-if="producto")
      .media
        .media-left
          .image.is-64x64
            img(:src="comentario.img_producto")
        .media-content
          router-link.title.is-6(:to="`/producto/${comentario.slug_producto}`") {{comentario.nombre_producto}}
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import {mapMutations} from 'vuex'

export default {
  components: {
    Carousel, Slide
  },
  props: {
    comentario: {
      type: Object
    },
    producto: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapMutations(['changeModalFoto', 'changeFotoComent'])
  }
}
</script>

<style lang="scss" scoped>
.img_profile{
  border-radius: 50%;
}
.comentario{
  .card-content{
    .content{
      .image{
        img{
          cursor: pointer;
        }
      }
    }
  }
}
footer{
  .media{
    .image{
      padding-top: 8px;
    }
  }
  .media-content{
    padding-top: 15px;
  }
}
</style>