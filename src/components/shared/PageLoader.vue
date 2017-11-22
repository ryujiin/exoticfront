<template lang="pug">
.page-loader(v-if="!load")
  .contenido
    .letras
      div(v-for="letra in getTextoPageLoading") {{letra}}
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'pageloader',
  computed: {
    ...mapGetters(['getTextoPageLoading'])
  },
  props: {
    load: {
      default: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.spinner{
  opacity: .5;
  font-size: 20px;
}
.page-loader{
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: #fff;
  top: 0;
  padding-top: 200px;
  .contenido{
    margin: 0 auto;
    position: relative;
  }
  .letras{
    font-family: monospace;
    font-size: 30px;
    color: #000;
    div{
      position: absolute;
      animation: move 3.5s infinite cubic-bezier(.2,.64,.81,.23);
      &:nth-child(1){
        animation-delay: 800ms;
      }
      &:nth-child(2){
        animation-delay: 700ms;
      }
      &:nth-child(3){
        animation-delay: 600ms;
      }
      &:nth-child(4){
        animation-delay: 500ms;
      }
      &:nth-child(5){
        animation-delay: 400ms;
      }
      &:nth-child(6){
        animation-delay: 300ms;
      }
      &:nth-child(7){
        animation-delay: 200ms;
      }
      &:nth-child(8){
        animation-delay: 100ms;
      }
    }
  }
}
@keyframes move {
  0% {
    left: 0%;
    opacity: 0;
  }
  20% {
    opacity: .5;
  }
  50% {
    left:50%;
    opacity: 1;
  }
  80% {
    opacity: .5
  }
  100% {
    left:100%;
    opacity: 0;
  }
}
</style>