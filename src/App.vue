<template lang="pug">
  #app(@mouseleave="mostrarCupon")
    transition(name="fade")
      lv-page-loader(v-if='getPageloading')
    vue-progress-bar
    lv-cart-slide
    lv-menu-mobil-slide
    lv-header
    router-view
    lv-footer
    lv-modal-login
    lv-modal-foto
    lv-modal-cupon
</template>

<script>
import lvPageLoader from '@/components/shared/PageLoader'

import LvHeader from '@/components/layout/Header.vue'
import LvFooter from '@/components/layout/Footer.vue'
import lvModalLogin from '@/components/user/ModalLogin.vue'
import LvCartSlide from '@/components/layout/CartSlide.vue'
import lvMenuMobilSlide from '@/components/layout/MenuMobilSlide.vue'

import lvModalFoto from '@/components/shared/modalFoto'
import lvModalCupon from '@/components/shared/ModalCupon'

import {mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  name: 'app',
  components: {
    LvHeader, LvFooter, lvModalLogin, LvCartSlide, lvPageLoader, lvMenuMobilSlide, lvModalFoto, lvModalCupon
  },
  computed: {
    ...mapGetters(['getCategorias', 'getPageloading', 'getPerfil'])
  },
  methods: {
    ...mapActions(['buscarCategorias', 'buscarVariaciones']),
    ...mapMutations(['changePageLoading', 'changeModalCupon']),
    mostrarCupon () {
      if (!this.getPerfil.id) {
        this.changeModalCupon(true)
      };
    }
  },
  created () {
    if (this.getCategorias.length === 0) {
      this.buscarCategorias(this.$route.params.slug)
      .then(res => {
        this.buscarVariaciones()
        .then(res => {
          this.changePageLoading(false)
        })
      })
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed|Roboto+Condensed');
@import '../node_modules/bulma/bulma.sass';

.italic{
  font-style: italic;
  font-family: georgia;
}
.title, .subtitle{
  font-family: 'Barlow Semi Condensed', sans-serif;
}
#app {
  margin-top: 75px;
  font-family: 'Roboto Condensed', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #111;
  @media screen and (max-width: 1215px) {
    margin-top: 60px;
  }
}
// Transitions
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
// animaciones
.girar {
  animation-name: girando;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-direction: alternate;
}
@keyframes girando {
  0% {
    transform: rotate(0deg)
  }
  100%{
    transform: rotate(360deg)
  }
}
</style>