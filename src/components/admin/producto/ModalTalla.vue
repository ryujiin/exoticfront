<template lang="pug">
  .modal(:class="{'is-active': modal}")
    .modal-background(@click="changeModalfalse")
    .modal-card
      header.modal-card-head
        p.modal-card-title Tallas de {{producto.full_name}}
        button.delete(aria-label='close' @click="changeModalfalse")
      section.modal-card-body
        .columns.is-multiline
          .column(v-for="varia in producto.variaciones")
            .box.has-text-center 
              label.checkbox
                input(type='checkbox', :value="varia" v-model="editar")
                .nombre {{varia.talla}}
                .producto-precios-variacion
                  .precio-old.has-text-danger S/.{{varia.precio}}
                  .precio-venta.has-text-black-bisS S/. {{varia.precio_venta}}
        .tallas
          .talla(v-for="talla in getVariaciones")
            label.checkbox
              input(type='checkbox', :value="talla" v-model="seleccionada")
              |   {{talla.nombre}}
        .formulario(v-if="seleccionada.length !==0 || editar.length !==0")
          .field.is-horizontal
            .field-label 
              label.label Precio
            .field-body
              .field.is-expanded
                .field.has-addons
                  p.control
                    a.button.is-static
                      | S/.
                  p.control.is-expanded
                    input.input(type='number', placeholder='precio' v-model="precio")
          .field.is-horizontal
            .field-label 
              label.label Precio En Oferta
            .field-body
              .field.is-expanded
                .field.has-addons
                  p.control
                    a.button.is-static
                      | S/.
                  p.control.is-expanded
                    input.input(type='number', placeholder='precio de oferta' v-model="precio_oferta")
        .box(v-if="seleccionada.length !==0 || editar.length !==0")
          span.tag.is-dark(v-for="talla in seleccionada") {{talla.nombre}}
      footer.modal-card-foot
        button.button.is-success(@click="grabar") Guardar Cambios
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import lovizApiAdminCatalogo from '@/services/catalogo/productos'

export default {
  props: ['producto', 'modal'],
  data () {
    return {
      seleccionada: [],
      editar: [],
      editados: 0,
      precio: null,
      precio_oferta: null
    }
  },
  computed: {
    ...mapGetters(['getVariaciones', 'getToken'])
  },
  methods: {
    ...mapActions(['buscarProducto']),
    changeModalfalse () {
      this.$emit('modalFalse')
    },
    grabar () {
      var talla = {
        precio_minorista: this.precio,
        precio_oferta: this.precio_oferta,
        producto: this.producto.id
      }
      for (var i = this.seleccionada.length - 1; i >= 0; i--) {
        var coincidencia = this.editar.find((talla) => talla.talla === this.seleccionada[i].nombre)
        if (!coincidencia) {
          this.editados = this.editados + 1
          talla.talla = this.seleccionada[i].id
          lovizApiAdminCatalogo.createProductoTalla(talla, this.getToken)
          .then(res => {
            this.editados = this.editados - 1
          })
        }
      }
      for (var t = this.editar.length - 1; t >= 0; t--) {
        this.editados = this.editados + 1
        talla.id = this.editar[t].id
        talla.talla = this.getVariaciones.find((v) => v.nombre === this.editar[t].talla).id
        lovizApiAdminCatalogo.editProductoTalla(talla, this.getToken)
        .then(res => {
          this.editados = this.editados - 1
        })
      }
      this.seleccionada = []
      this.editar = []
    },
    verificar () {
      console.log(this.editados)
      if (this.editados === 0) {
        this.buscarProducto(this.producto.slug)
      };
    }
  },
  watch: {
    'editados': 'verificar'
  }
}
</script>

<style lang="scss" scoped>
.tallas{
  .talla{
    display: inline-block;
    border: 1px solid #ccc;
    margin: 5px;
    padding: 5px;
    border-radius: 5px;
  }
}
.tag{
  margin: 5px
}
</style>
