<template lang="pug">
.modal(:class="{'is-active': getModalFoto}")
  .modal-background(@click="changeModalFoto(false)")
  .modal-content
    p.image
      img(:src='getComentFoto', alt='')
  button.modal-close.is-large(aria-label='close')
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  computed: {
    ...mapGetters(['getComentFoto', 'getModalFoto'])
  },
  methods: {
    ...mapMutations(['changeModalFoto'])
  }
}
</script>