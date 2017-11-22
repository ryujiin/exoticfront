<template lang="pug">
.galeria-full.is-hidden-mobile
  lv-zoom-image(:imagen="imagenSeleccionada" v-on:siguente='siguienteImagen' v-if="imagenSeleccionada")
  .thums
    ul
      li(v-for="img in producto.imagenes_producto", :class="{'activo': img.orden === imagenSeleccionada.orden }" @click="cambiarImagen(img)")
        img(:src="img.imagen_thum")
      li.has-text-centered(v-if="getPerfil.staff" @click="modal = true")
        span mas Fotos
        span.icon
          i.fa.fa-plus
  .modal(:class="{'is-active': modal}")
    .modal-background(@click="modal = false")
    .modal-card
      header.modal-card-head
        p.modal-card-title Editar Imagenes
        button.delete(aria-label='close' @click="modal = false")
      section.modal-card-body
        .subtitle {{producto.full_name}}
        .columns
          .column.is-3(v-for="img in producto.imagenes_producto")
            .box
              figure.image
                img(:src="img.imagen_thum")
              button.delete(aria-label='close' @click="borrarImage(img)")
        .content
          lv-upload-image(:producto="producto")
      footer.modal-card-foot
        button.button.is-success Save changes
        button.button Cancel


</template>

<script>
import {mapGetters} from 'vuex'
import lvZoomImage from '@/components/producto/galeria/ZoomImage'

import lvUploadImage from '@/components/admin/producto/UploadImage'
import { deleteImageProducto } from '@/services/axios/lovizApiImage'

export default {
  props: ['producto'],
  data () {
    return {
      imagenSeleccionada: {},
      modal: false
    }
  },
  computed: {
    ...mapGetters(['getPerfil', 'getToken'])
  },
  components: {
    lvZoomImage, lvUploadImage
  },
  methods: {
    cambiarImagen (img) {
      this.imagenSeleccionada = img
    },
    iniciar () {
      this.imagenSeleccionada = this.producto.imagenes_producto[0]
    },
    siguienteImagen () {
      var cant = this.producto.imagenes_producto.length
      var num
      for (var i = cant - 1; i >= 0; i--) {
        if (this.producto.imagenes_producto[i].orden === this.imagenSeleccionada.orden) {
          num = i + 1
          if (num === cant) {
            num = 0
          };
        };
      }
      this.imagenSeleccionada = this.producto.imagenes_producto[num]
    },
    borrarImage (img) {
      deleteImageProducto(this.getToken, img.id)
      .then(res => {
        console.log(res)
      })
    }
  },
  created () {
    this.iniciar()
  },
  watch: {
    'producto': 'iniciar'
  }
}
</script>

<style lang="scss" scoped>
.galeria-full{
  max-width: 1250px;
  margin: 0 20px;
  .thums{
    margin: 10px;
    ul{
      li{
        width: 80px;
        margin: 2px;
        display: inline-block;
        cursor: pointer;
        border: 1px solid #fff;
        border-radius: 5px;
        padding: 3px;
        &:hover{
          border: 1px solid #ccc;
        }
        &.activo{
          border: 1px solid #ccc;
        }
      }
    }
  }
}
.box{
  position: relative;
  .delete{
    position: absolute;
    top: 0px;
    right: 10px;
  }
}
</style>