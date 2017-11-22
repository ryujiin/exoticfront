<template lang="pug">
.modal(:class="{'is-activate': modal}")
  .modal-background
  .modal-card
    header.modal-card-head
      p.modal-card-title {{producto.full_name}}
      button.delete(aria-label='close')
    section.modal-card-body
      // Content ...
    footer.modal-card-foot
      button.button.is-success Guardar Cambios
      button.button Cancel
</template>

<script>
export default {
  props: ['producto', 'modal']
}
</script>

<style lang="scss" scoped>
</style>
