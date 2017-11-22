<template lang="pug">
.producto
  .box
    .container
      .columns.is-multiline
        .column.is-6          
          .field
            label.label Nombre
            .control
              input.input(type='text', placeholder='Nombre del Producto' v-model="producto.nombre")
        .column.is-6        
          .field
            label.label Variacion
            .control
              input.input(type='text', placeholder='Variacion del Producto' v-model="producto.texto_variacion")
        .column.is-6
          .field
            label.label Descripcion
            .control.has-icons-left.has-icons-right
              vue-editor(v-model="producto.descripcion")
        .column.is-6
          .card
            header.card-header
              p.card-header-title
                | Categorias
            .card-content
              .content
                .field
                  .select
                    select(v-model="cateAdd")
                      option(v-for="c in getCategorias" v-if="c.seccion == 'estilo' || c.seccion == 'coleccion'", :value="c") {{c.full_name}}
                span.tag(v-for="(cat, index) in categorias" 
                          @click="remove(index)"
                          :class="{'is-dark': cat.seccion}") {{cat.nombre}}
        .column.is-12
          .card
            header.card-header
              p.card-header-title
                | Caracteristicas
            .card-content
              .content
                .columns(v-for="c in caracteristicas")
                  .column.is-3
                    .field
                      p.control.is-expanded
                        input.input(type='text', placeholder='Nombre', v-model="c.nombre")
                  .column.is-9
                    .field
                      p.control.is-expanded
                        input.input(type='email', placeholder='Datos', v-model="c.descripcion")
                a.button(@click="addCaracteristica")
                  span.icon
                    i.fa.fa-plus
                  span Agregar categoria
                  
      p.has-text-centered
        a.button.is-success.is-large(@click="grabarProducto")
          span.icon
            i.fa.fa-save
          span Guardar Cambios 
</template>

<script>
import {mapGetters} from 'vuex'
import { VueEditor } from 'vue2-editor'

import lvSeparador from '@/components/shared/Separador'

import lovizApiService from '@/services/catalogo/productos'

export default {
  components: {
    lvSeparador, VueEditor
  },
  data () {
    return {
      producto: {
        id: null,
        nombre: '',
        texto_variacion: '',
        descripcion: '',
        relaciones: [],
        categorias: [],
        etiquetas: [],
        activo: false
      },
      cateAdd: {},
      categorias: [],
      caracteristicas: [],
      variaciones: [],
      num_salvar: 0,
      relaciones: []
    }
  },
  methods: {
    grabarProducto () {
      if (this.producto.texto_variacion) {
        if (this.producto.id) {
          console.log('editar')
        } else {
          lovizApiService.createProductosAdmin(this.producto, this.getToken)
          .then(res => {
            console.log(res)
            this.producto.id = res.id
            this.producto.slug = res.slug
            this.num_salvar = this.variaciones.length + this.caracteristicas.length
            this.guardarCategorias()
            this.guardarVariaciones()
          })
        }
      } else {
        alert('El texto variacion es necesario')
      }
    },
    guardarCategorias () {
      if (this.caracteristicas.length !== 0) {
        var cara = {
          producto: this.producto.id
        }
        for (var i = this.caracteristicas.length - 1; i >= 0; i--) {
          cara.nombre = this.caracteristicas[i].nombre
          cara.descripcion = this.caracteristicas[i].descripcion
          lovizApiService.createCaracteristicaAdmin(cara, this.getToken)
          .the(res => {
            this.num_salvar = this.num_salvar - 1
          })
        };
      }
    },
    guardarVariaciones () {
      if (this.producto.id) {
        for (var i = this.variaciones.length - 1; i >= 0; i--) {
          this.variaciones[i].producto = this.producto.id
          lovizApiService.createProductoTalla(this.variaciones[i], this.getToken)
          .then(res => {
            this.num_salvar = this.num_salvar - 1
          })
        };
      };
    },
    verificar () {
      if (this.num_salvar === 0) {
        this.$router.push({name: 'Producto', params: {'slug': this.producto.slug}})
      };
    },
    addCate () {
      if (this.addCate) {
        var coincidencia = this.categorias.find((c) => c.id === this.cateAdd.id)
        if (!coincidencia) {
          this.categorias.push(this.cateAdd)
          if (this.cateAdd.padre) {
            this.addPadres(this.cateAdd.padre)
          }
        }
      }
    },
    addPadres (slug) {
      var coincidencia = this.getCategorias.find((c) => c.slug === slug)
      this.categorias.push(coincidencia)
      if (coincidencia.padre) {
        this.addPadres(coincidencia.padre)
      };
    },
    remove (index) {
      this.categorias.splice(index, 1)
    },
    addCaracteristica () {
      this.caracteristicas.push({nombre: '', descripcion: ''})
    },
    changeCaracteristica () {
      this.cantidad_caracte = this.caracteristicas.length
    },
    cambioCategoria () {
      this.producto.categorias = []
      for (var i = this.categorias.length - 1; i >= 0; i--) {
        this.producto.categorias.push(this.categorias[i].id)
      };
    },
    addRelaciones () {
      this.producto.relaciones = []
      for (var i = this.relaciones.length - 1; i >= 0; i--) {
        this.producto.relaciones.push(this.relaciones[i].id)
      }
    },
    addVariacion () {
      for (var i = this.getproductoActual.variaciones.length - 1; i >= 0; i--) {
        var varia = {
          precio_minorista: this.getproductoActual.variaciones[i].precio,
          talla: this.getVariaciones.find((v) => v.nombre === this.getproductoActual.variaciones[i].talla).id
        }
        if (this.getproductoActual.variaciones[i].oferta !== 0) {
          varia.precio_oferta = this.getproductoActual.variaciones[i].precio_venta
        };
        this.variaciones.push(varia)
      };
    }
  },
  computed: {
    ...mapGetters(['getPerfil', 'getproductoActual', 'getCategorias', 'getToken', 'getVariaciones'])
  },
  created () {
    if (this.getPerfil.staff) {
      if (this.getproductoActual.slug === this.$route.params.slug) {
        this.producto.nombre = this.getproductoActual.nombre
        this.producto.descripcion = this.getproductoActual.descripcion
        this.categorias = this.getproductoActual.categorias
        this.producto.etiquetas = this.getproductoActual.etiquetas
        this.caracteristicas = this.getproductoActual.caracteristicas
        this.relaciones = this.getproductoActual.relaciones
        this.addVariacion()
      }
    } else {
      this.$router.push({name: 'Home'})
    }
  },
  watch: {
    'cateAdd': 'addCate',
    'caracteristicas': 'changeCaracteristica',
    'cantidad_caracte': 'verificar',
    'categorias': 'cambioCategoria',
    'relaciones': 'addRelaciones',
    'num_salvar': 'verificar'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.tag{
  margin: 5px;
  cursor: pointer;
}
</style>
