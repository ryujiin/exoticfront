<template lang="pug">
  header
    lv-header-movil.is-hidden-desktop
    lv-header-destock.is-hidden-touch
    transition(name="slidebusqueda")
      lv-busqueda(v-if="getTiendaBusqueda")
</template>

<script>
import lvHeaderMovil from '@/components/layout/HeaderMovil'
import lvHeaderDestock from '@/components/layout/HeaderDestock'
import lvBusqueda from '@/components/shared/CajaBusqueda'

import {mapGetters} from 'vuex'

export default {
  name: 'Header',
  components: {
    lvHeaderMovil, lvHeaderDestock, lvBusqueda
  },
  computed: {
    ...mapGetters(['getPerfil', 'getTiendaBusqueda'])
  }
}
</script>

<style lang="scss" scoped>
header{
	position: fixed;
	z-index: 9;
	width: 100%;
  top: 0px;
}

.slidebusqueda-enter-active {
  transition: all .3s ease;
}
.slidebusqueda-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slidebusqueda-enter, .slidebusqueda-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-25px);
  opacity: 0;
}
</style>
