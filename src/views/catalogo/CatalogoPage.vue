<template lang="pug">
.catalogo
  div(v-if="getCategoriaActual")
    .hero-catalogo
      img(:src="getCategoriaActual.imagen")
    .container
      .barra
        .titulos
          .subtitle(v-if="getCategoriaPadre") {{getCategoriaPadre.nombre}}
          .subtitle(v-else) Coleccion
          .title {{getCategoriaActual.nombre}}
        .menus
          .contador
            span {{getNumArticulos}} productos
            span |
            span Refinar Por: 
          .tipo.dropdown.is-hoverable(v-if="hayHijo")
            .dropdown-trigger
              button.button(aria-haspopup='true', aria-controls='dropdown-menu')
                span Categorias
                span.icon.is-small
                  i.fa.fa-angle-down(aria-hidden='true')
            #dropdown-menu.dropdown-menu(role='menu')
              .dropdown-content
                .link(v-for="hijo in getCategoriasHijos")
                  router-link.dropdown-item(:to="`/catalogo/${hijo.slug}/`") 
                    | {{hijo.nombre}}
          //-.diseno.dropdown.is-right.is-hoverable
            .dropdown-trigger
              button.button(aria-haspopup='true', aria-controls='dropdown-menu')
                span Diseños
                span.icon.is-small
                  i.fa.fa-angle-down(aria-hidden='true')
            #dropdown-menu.dropdown-menu(role='menu')
              .dropdown-content
                p.etis
                  .chip(v-for="eti in getEtiquetas")
                    | {{eti.nombre}} ({{eti.num_productos}})
                    i.close.material-icons(@click="addEtiqueta(eti)" v-if="etisSelecionada(eti)") check_box_outline_blank
                    i.close.material-icons(@click="removeEtique(eti)" v-else) check_box
          .ordenar.dropdown.is-hoverable.is-right
            .dropdown-trigger
              button.button(aria-haspopup='true', aria-controls='dropdown-menu')
                span(v-if="ordenar.titulo.length === 0") Ordenar Por
                span(v-else) {{ordenar.titulo}}
                span.icon.is-small
                  i.fa.fa-angle-down(aria-hidden='true')
            #dropdown-menu.dropdown-menu(role='menu')
              .dropdown-content
                a.dropdown-item(@click="changeOrdenar('precios', 'Precio - Bajo a Alto')")
                  | Precio - Bajo a Alto
                a.dropdown-item(@click="changeOrdenar('-precios', 'Precio - Alto a Bajo')")
                  | Precio - Alto a Bajo
                a.dropdown-item(@click="changeOrdenar('-vendidos', 'Lo Mas Vendidos')")
                  | Lo Mas Vendidos
                a.dropdown-item(@click="changeOrdenar('-vendidos', 'Lo Mas Valorados')")
                  | Lo Mas Valorados
                a.dropdown-item(@click="changeOrdenar('-actualizado', 'Lo mas Nuevo')")
                  | Lo mas Nuevo
      lv-lista-productos.catalogo-lista(:categoria="getCategoriaActual.slug", 
                                        :ordenar='ordenar.valor', 
                                        catalogo=true,
                                        :disenos='getDiseneosIds')
  .container(v-else)
    .hero-catalogo
    h1 Error No existe una categoria 
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import lvListaProductos from '@/components/catalogo/ListaProductos'

export default {
  components: {
    lvListaProductos
  },
  data () {
    return {
      productos: {},
      catalogoSlug: '',
      botones: {
        ordenar: false,
        diseno: false,
        tipo: false
      },
      ordenar: {
        valor: '',
        titulo: ''
      },
      titulo: '',
      descripcion: 'Busque su par favorito en la coleccion oficial de Loviz DelCarpio, y obtenga envio gratis a todo el Peru'
    }
  },
  computed: {
    ...mapGetters(['getCategoriaActual', 'getCategorias', 'getCategoriaPadre', 'getEtiquetas', 'getEtiquetaSeleccionados', 'getCategoriasHijos', 'getNumArticulos', 'getDiseneosIds']),
    hayHijo () {
      if (this.getCategoriasHijos.length === 0) {
        return false
      }
      return true
    }
  },
  methods: {
    ...mapMutations(['asignarCategoriaActual', 'changeHeroTop', 'addEtiqueta', 'removeEtique', 'asignarCategoriasHijo', 'initialEtiquetaSelecionadas']),
    ...mapActions(['buscarCategorias', 'buscarEtiquetas']),
    changeCatalogoSlug () {
      this.verificarEtiquetas()
      this.asignarCategoriaActual(this.$route.params.slug)
    },
    changeCategoriaActual () {
      this.asignarCategoriasHijo()
      this.initialEtiquetaSelecionadas()
      this.ordenar = {
        valor: '',
        titulo: ''
      }
      if (this.getCategoriaActual) {
        if (this.getCategoriaActual.imagen) {
          this.changeHeroTop(true)
        } else {
          this.changeHeroTop(false)
        }
        this.changeHead()
      }
    },
    verButton (key) {
      for (var buton in this.botones) {
        this.botones[buton] = false
      }
      this.botones[key] = true
    },
    verificarEtiquetas () {
      if (this.getEtiquetas.length === 0) {
        this.buscarEtiquetas()
      }
    },
    etisSelecionada (eti) {
      var etuq = this.getEtiquetaSeleccionados.find((etiqueta) => etiqueta.id === eti.id)
      if (etuq) {
        return false
      } else {
        return true
      }
    },
    changeOrdenar (valor, titulo) {
      this.ordenar.valor = valor
      this.ordenar.titulo = titulo
    },
    changeHead () {
      this.titulo = this.getCategoriaActual.full_name
      if (this.getCategoriaActual.titulo_seo) {
        this.titulo = this.getCategoriaActual.titulo_seo
      }
      if (this.getCategoriaActual.descripcion.length !== 0) {
        this.descripcion = this.getCategoriaActual.descripcion.slice(0, 150) + '...'
      }
      this.$emit('updateHead')
    }
  },
  created () {
    this.changeCatalogoSlug()
  },
  watch: {
    '$route': 'changeCatalogoSlug',
    'getCategoriaActual': 'changeCategoriaActual'
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

<style lang="scss">
.hero-catalogo{
  min-height: 10px;
}
.catalogo-lista{
  min-height: 400px;
}
.contador{
  display: inline-block;
}
.barra{
  width: 100%;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  .contador{
    margin: 6px 10px;
  }
  .menus{
    .dropdown{
      margin: 0 5px;
      .button{
        border: 1px solid #000;
        border-radius: 0px;
        color: #000;
      }
    }
    .diseno{
      .dropdown-menu{
        width: 350px;
      }
      .dropdown-content{
        padding: 10px;
      }
      .chip{
        &:hover{
          background-color: #e0f2f1;
        }
      }
    }
  }
}
</style>