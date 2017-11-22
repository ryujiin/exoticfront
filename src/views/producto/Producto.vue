<template lang="pug">
.producto(v-if="getproductoActual.id")
  .hero-producto
  .producto-detalle-imagen
    lv-galeria-mobil.is-hidden-tablet(:producto="getproductoActual")
    lv-galeria-destock.is-hidden-mobile(:producto="getproductoActual")
    .info
      .card.z-depth-5
        .card-content
          .botonesActivo.is-pulled-right(v-if="getPerfil.staff")
            a.button.is-large.is-success(v-if="!getproductoActual.activo" @click="activar(true)") Activar
            a.button.is-large.is-danger(v-else @click="activar(false)") Desactivar
          .producto-name
            .estilo(v-for="cate in getproductoActual.categorias")
              router-link(to="`/catalogo/${cate.slug}`" v-if="cate.seccion == 'categoria'") {{cate.nombre}}
            span.texto-impacto.texto-2 
            .title {{getproductoActual.nombre}}
            .subtitle ({{getproductoActual.texto_variacion}})
          .producto-categoria
            .cates(v-for="cate in getproductoActual.categorias" v-if="!cate.padre")
              router-link.texto-impacto.texto-2.texto-2.button.is-small(:to="`/catalogo/${cate.slug}`") {{cate.nombre}}
          .producto-precios
            .producto-precios-variacion(v-if="!getTallaSeleccionada.id")
              .precio-old.has-text-danger(v-if="getproductoActual.precio != getproductoActual.precio_venta") S/. {{getproductoActual.precio}}
              .precio-venta.has-text-black-bis S/. {{getproductoActual.precio_venta}}
            .producto-precios-variacion(v-else)
              .precio-old.has-text-danger(v-if="getTallaSeleccionada.precio != getTallaSeleccionada.precio_venta") S/.{{getTallaSeleccionada.precio}}
              .precio-venta.has-text-black-bisS S/. {{getTallaSeleccionada.precio_venta}}
          .producto-review
            .producto-estrellas.has-text-primary
              span.icon(v-for="star in 5")
                i.fa.fa-star(v-if="star <=getproductoActual.sort_valoracion")
                i.fa.fa-star-o(v-else)
            .producto-leer-escribir(@click="verComentario(true)")
              span.ratio {{getproductoActual.valoracion}}
              span.num-coments ({{getproductoActual.num_comentarios}})
              span.texto-impacto.texto-2 Danos tu Opinion
          .producto-variaciones
            .variacion-seleccion
              .titulo-seleccion.texto-impacto.texto-2 Variaciones:
              .valor-seleccion {{getproductoActual.color}}
              span(v-if="getPerfil.staff")
                router-link.button(:to="{name: 'Add_Variacion', params: {slug: getproductoActual.slug}}")
                  span.icon
                    i.fa.fa-plus
                  span Agregar una variacion
              .opciones-seleccion
                ul
                  li.selecionado
                    figure
                      a(href="/")
                        img(:src="getproductoActual.thum")
                  li(v-for="relacion in getproductoActual.relaciones")
                    figure
                      router-link(:to="`/producto/${relacion.slug}`")
                        img(:src="relacion.thum")                  
            .variacion-talla
              .titulo-seleccion.texto-impacto.texto-2 Tallas Disponibles: {{this.getTallaSeleccionada.talla}}
              .opciones-seleccion.talla-opciones
                .talla-opcion(
                  v-for="varia in getproductoActual.variaciones",
                  @click="selecionTalla(varia)",
                  :class="{'activo' : getTallaSeleccionada == varia}") {{varia.talla}}
                  .precio(v-if="getPerfil.staff") S/. {{varia.precio_venta}}
                .talla-opcion(v-if="getPerfil.staff" @click="adminTalla = true") Agregar Talla
          lv-separador(:alto="10")
          lv-add-to-cart
  .producto-detalles
    .container
      .tabs.is-centered
        ul
          li(:class="{'is-active' : tabs.valor == 1}", @click="changeTabs(1)")
            a Descripcion
          li(:class="{'is-active' : tabs.valor == 2}", @click="changeTabs(2)")
            a Comentarios ({{getproductoActual.num_comentarios}})
      .content
        .descripcion.columns(v-if="tabs.valor == 1")
          .column
            .descripcion-detalles
              .title Detalles
              .subtitle Modelo: {{getproductoActual.sku}}
              p.contenido {{getproductoActual.descripcion}}
              ul
                li(v-for="caracteristica in getproductoActual.caracteristicas")
                  strong {{caracteristica.nombre}} - 
                  span {{caracteristica.descripcion}}
          .column
            .banner
              img(src="/static/img/banner-verano.jpg")
        lv-section-review(:producto="getproductoActual" v-if="tabs.valor == 2")
  lv-form-coment(:producto='getproductoActual', :modal="formComent")
  lv-admin-talla(v-if="getPerfil.staff", :producto="getproductoActual", :modal="adminTalla", @modalFalse="adminTalla = false")
</template>

<script>
import {mapMutations, mapGetters, mapActions} from 'vuex'

import lvAddToCart from '@/components/producto/AddToCart'
import lvSeparador from '@/components/shared/Separador'
import lvGaleriaMobil from '@/components/producto/GaleriaMobil'
import lvGaleriaDestock from '@/components/producto/galeria/GaleriaDestock'
import lvFormComent from '@/components/producto/FormComent'
import lvSectionReview from '@/components/producto/SectionReviews'

import lvAdminTalla from '@/components/admin/producto/ModalTalla'

export default {
  name: 'Producto',
  components: {
    lvAddToCart, lvSeparador, lvGaleriaMobil, lvGaleriaDestock, lvFormComent, lvSectionReview, lvAdminTalla
  },
  data () {
    return {
      adminProducto: false,
      adminTalla: false,
      productoSlug: '',
      imagenSelecionada: '',
      zoom: false,
      productos: {},
      formComent: false,
      tabs: {
        valor: 1,
        change: true
      },
      titulo: '',
      descripcion: 'Compre este lindo calzado que forma parte de la coleccion oficial de Loviz DelCarpio, y obtenga envio gratis a todo el Peru'
    }
  },
  computed: {
    ...mapGetters(['getproductoActual', 'getTallaSeleccionada', 'getFormComent', 'getPerfil', 'getToken']),
    primera_imagen () {
      if (!this.getproductoActual.id) {
        return
      }
      if (this.imagenSelecionada !== '') {
        return this.imagenSelecionada
      } else {
        return this.getproductoActual.imagenes_producto[0].imagen
      }
    }
  },
  methods: {
    ...mapMutations(['selecionTalla', 'verComentario', 'changeHeroTop', 'changePageLoading']),
    ...mapActions(['buscarProducto', 'editarProducto']),
    changeProductoSlug () {
      this.changePageLoading(true)
      this.tallaSeleccionada = {}
      this.imagenSelecionada = ''
      this.productoSlug = this.$route.params.slug
      this.$scrollTo('body')
    },
    buscarProductoSlug () {
      this.buscarProducto(this.productoSlug)
      .then(res => {
        this.changePageLoading(false)
      })
    },
    changeFormComent (valor) {
      this.formComent = valor
    },
    changeTabs (valor) {
      this.tabs.valor = valor
    },
    changeHead () {
      this.titulo = this.getproductoActual.full_name
      if (this.getproductoActual.descripcion.length !== 0) {
        this.descripcion = this.getproductoActual.descripcion.slice(0, 150) + '...'
      }
      this.$emit('updateHead')
    },
    activar (valor) {
      var producto = {
        id: this.getproductoActual.id,
        activo: valor
      }
      this.editarProducto(producto)
      .then(res => {
        this.buscarProducto(this.getproductoActual.slug)
      })
    }
  },
  created () {
    this.changeProductoSlug(this.$route.params.slug)
    this.changeHeroTop(false)
  },
  watch: {
    '$route': 'changeProductoSlug',
    'productoSlug': 'buscarProductoSlug',
    'getproductoActual': 'changeHead'
  },
  head: {
    title () {
      return {
        inner: this.titulo
      }
    },
    meta () {
      return [{
        name: 'description', content: this.descripcion
      }]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.VueCarousel-navigation-next{
  right: 50px;    
}
.producto{
  .hero-producto{
    min-height: 10px;
  }
  .producto-detalle-imagen{
    position: relative;
    max-width: 1500px;
    margin: 0 auto;
    min-height: 530px;
    .galeria{
      margin: 0 auto;
    }
    .info{
      position: absolute;
      right: 50px;
      top: 10px;
      width: 430px;
      @media screen and (max-width: 1215px) {
        position: static;
        width: 100%;
      }
    }
  }
  .producto-detalles{
    padding-top: 20px;
    background-color: #f9f9f9;
    box-shadow: 0px 0px 5px #888888;
    padding-bottom: 20px;
  }
}
.producto{
  .producto-categoria{
    .cates{
      display: inline-block;
      margin: 2px 5px;
      a{
        border-radius: 0px;
      }
    }
  }
  .producto-precios{
    .producto-precios-variacion{
      font-size: 2em;
      div{
        display: inline-block;
      }
      .precio-old{
        text-decoration: line-through;
        font-size: 0.5em;
        margin: 0 10px 0 0;
      }
    }
  }
  .producto-review{
    color: #111;
    .producto-estrellas,.producto-leer-escribir{
      display: inline-block;
    }
    .ratio{
      text-decoration: underline;
      margin: 0 5px 0 10px;
    }
    .num-coments{
      margin: 0 10px;
    }
    .texto-impacto.texto-2{
      cursor: pointer;
      text-decoration: underline;
    }
    .modal{
      .modal-content{
        background-color: #fff;
      }
    }
  }
  .producto-variaciones{
    margin: 20px 0;
    .variacion-seleccion{
      .titulo-seleccion,.valor-seleccion{
        display: inline-block;
      }
      .valor-seleccion{
        margin: 10px;
      }
      .opciones-seleccion{
        ul{
          li{
            display: inline-block;
            width: 80px;
            margin: 0 10px 0 0;
            &.selecionado,&:hover{
              border-bottom: 2px solid #111
            }
          }
        }
      }
    }
    .variacion-talla{
      .talla-opciones{
        .talla-opcion{
          display: inline-block;
          border: 1px solid #ccc;
          margin: 0 10px 5px 0;
          color: #111;
          padding: 5px;
          cursor: pointer;
          &:hover,&.activo{
            border-color: #111
          }
        }
      }
    }
  }
}


</style>
