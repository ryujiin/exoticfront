<template lang="pug">
div
  .buscando(v-if="buscando")
    lv-spinner
  .encontrado(v-else)
    .lista-productos.columns.is-multiline(v-if="productos.length !==0")
      .producto.column.is-4(v-for="p in productos" v-if="aparecer(p)")
        .card.hoverable
          router-link(:to="`/producto/${p.slug}`")
            .card-image
              figure.image.is-4by3
                .senales
                  .senal.oferta(v-if="p.es_oferta")
                    a.btn-floating.btn-large.waves-effect.waves-light.red
                      span.is-size-7 Oferta
                  .senal.nuevo(v-if="p.es_new")
                    a.btn-floating.btn-large.waves-effect.waves-light.blue.lighten-1
                      span.is-size-7 Nuevo
                img(:src="p.thum1")
                img.thum2(:src="p.thum2")
            .card-content.has-text-centered
              p(:class="{'has-text-danger': !p.activo, 'has-text-success': p.activo}" v-if="getPerfil.staff")
                strong Activo: 
                span {{p.activo}}
              span.card-title {{p.nombre}}
              br
              span.has-text-weight-bold ({{p.texto_variacion}})
              p.precios.is-size-5
                span.old.has-text-danger.is-size-7(v-if="p.es_oferta") S/.{{p.precio_lista}}
                span.venta S/.{{p.precio_venta}}
              .estrellas.has-text-primary
                span.icon(v-for="star in 5")              
                  i.fa.fa-star(v-if="star <=p.valor_producto")
                  i.fa.fa-star-o(v-else)
    .productos-empty.has-text-centered(v-else)
      p "Opps Lo sentimos, no se han encontrado resultados para su búsqueda"
</template>

<script>
import lovizApiProductoService from '@/services/catalogo/productos'

import lvSpinner from '@/components/shared/spinner'

import {mapMutations, mapGetters} from 'vuex'

export default {
  components: {
    lvSpinner
  },
  computed: {
    ...mapGetters(['getPerfil'])
  },
  name: 'Productos',
  props: {
    limite: {
      type: String,
      default: '100'
    },
    categoria: {
      type: String,
      default: ''
    },
    oferta: {
      type: Boolean,
      default: false
    },
    nuevo: {
      type: Boolean,
      default: false
    },
    ordenar: {
      type: String
    },
    catalogo: {
      type: Boolean,
      default: false
    },
    disenos: {
      type: Object
    },
    auto: {
      type: Boolean,
      default: false
    },
    busqueda: {
      type: String
    }
  },
  data () {
    return {
      productos: [],
      query: {},
      buscando: true
    }
  },
  methods: {
    ...mapMutations(['asignarNumArticulos']),
    buscarServer () {
      this.buscando = true
      this.productos = []
      if (this.limite) {
        this.query.limite = this.limite
      }
      if (this.categoria) {
        this.query.categoria = this.categoria
      }
      if (this.ordenar) {
        this.query.ordenado = this.ordenar
      }
      if (this.disenos) {
        this.query.disenos = this.disenos
      };
      if (this.busqueda) {
        this.query.busqueda = this.busqueda
      };
      lovizApiProductoService.getProductos(this.query)
      .then(res => {
        this.productos = res.results
        this.buscando = false
        this.asiganrNumeroCatalogo(res.count)
      })
    },
    asiganrNumeroCatalogo (num) {
      if (this.catalogo) {
        this.asignarNumArticulos(num)
      }
    },
    aparecer (p) {
      if (this.disenos) {
        for (var i = 0; i < this.disenos.length; i++) {
          for (var j = 0; j < p.etiquetas.length; j++) {
            if (p.disenos[i] === p.etiquetas[j]) {
              return false
            }
          }
        }
      }
      return true
    }
  },
  mounted () {
    this.buscarServer()
  },
  watch: {
    'categoria': 'buscarServer',
    'ordenar': 'buscarServer',
    'limite': 'buscarServer',
    'busqueda': 'buscarServer'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.producto{
  cursor: pointer;
  a{
    color: #111;
  }
  &:hover{
    .estrellas{
      opacity: 1;
      transform: translateY(0px)
    }
    .card-image{
      .image{
        .thum2{
          opacity: 1;
          transform: scale(1);
        }
      }
    }
  }
  .card-image{
    .image{
      img{
        transition: opacity .5s, transform .5s;
      }
      .thum2{
        opacity: 0;
        transform: scale(1.1);
      }
    }
    .senales{
      position: absolute;
      top: 10px;
      width: 100%;
      .senal{
        position: absolute;
        &:hover{
          a{
            color: #fff;
          }
        }
        &.nuevo{
          left: 15px;
        }
        &.oferta{
          right: 15px;
        }
      }
    }
  }
  .precios{
    .old{
      margin: 0 10px;
      text-decoration: line-through;
    }
  }
  .estrellas{
    opacity: 0;
    transition: opacity .5s, transform .5s;
    transform: translateY(50px);
  }
}
.productos-empty{
  height: 100px;
  margin: 50px 0 50px;
  padding: 30px 0 50px;
}

</style>
