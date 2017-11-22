<template lang="pug">
.boton_admin(v-if="getPerfil.staff")
  router-link.button.is-primary(to="/admin/")
    span Go Admin!!     
    span.icon
      i.fa.fa-chevron-right(aria-hidden='true')
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'BarraAdmin',
  computed: {
    ...mapGetters(['getPerfil'])
  }
}
</script>

<style lang="scss" scoped>
.boton_admin{
  position: fixed;
  z-index: 1000;
  top: 100px;
  left: 30px;
}
</style>
