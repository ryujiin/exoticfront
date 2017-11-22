<template lang="pug">
a.button.is-primary
  span.icon
    i.fa.fa-plus(aria-hidden='true')
  span Add Producto
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
.header-movil{
  background-color: #000;
  display: flex;
  justify-content: space-between;
}
</style>
