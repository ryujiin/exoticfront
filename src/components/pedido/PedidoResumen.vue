<template lang="pug">
.card.resumen
  header.card-header
    p.card-header-title
      | Resumen del Pedido
  .card-content
    .content
      p.help.has-text-centered Al generar su orden, usted se compromete a los 
        a Términos y condiciones
      lv-linea-cart 
  footer.card-footer
    table.table.is-fullwidth
      tbody
        tr
          td Subtotal ({{getCartNow.num_lineas}} Artículos):
          td.has-text-right S/. {{getCartNow.subtotal}}
        tr
          td Costo de Envio:
          td.has-text-right S/. {{getPedido.gasto_envio}}
        tr(v-if="getPerfil.id")
          td(v-if="getCartNow.cupon")
            strong {{getCartNow.nombre_cupon}} : {{getCartNow.desc}}%
          td.has-text-right.has-text-danger(v-if="getCartNow.cupon") -S/. {{getCartNow.rebaja}}
          td(colspan="2" v-else)
            p.help.is-danger {{error}}
            .field.has-addons              
              .control
                input.input(type='text', placeholder='Cupon Descuento', :class="{'is-danger': error, 'is-sucess': error.length == 0}" v-model="cupon")
              .control
                a.button.is-info(@click="aplicarCupon")
                  | Aplicar          
        tr.total
          td Total
          td.has-text-right.precio
            span.total(v-if="getPedido.id") S/. {{getPedido.total}}
            span.total(v-else) S/. {{getCartNow.total}}       
      
</template>

<script>
import LvLineaCart from '@/components/cart/LineasCart.vue'
import lovizApiUser from '@/services/user/lovizuser'
import lovizApiCarro from '@/services/cart/cartService'

import {mapGetters, mapMutations} from 'vuex'

export default {
  data () {
    return {
      cupon: '',
      error: ''
    }
  },
  components: {
    LvLineaCart
  },
  name: 'PedidoResumen',
  computed: {
    ...mapGetters(['getPedido', 'getCartNow', 'getPerfil'])
  },
  methods: {
    ...mapMutations(['assignarCart']),
    aplicarCupon () {
      if (this.cupon) {
        this.error = ''
        lovizApiUser.getCupon(this.cupon)
        .then(res => {
          if (res.count === 0) {
            this.error = 'No existe este cupon o ya fue usado'
            this.cupon = ''
          } else {
            lovizApiCarro.updateCartLogin({id: this.getCartNow.id, cupon: res.results[0].id})
            .then(res => {
              console.log(res)
              if (res.cupon[0]) {
                this.error = 'El cupon ya ha sido Usado'
              } else {
                this.assignarCart(res)
              }
            })
          }
        })
      } else {
        this.error = 'Ingrese un cupon'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
  border: 2px solid #f4f4f4;
  .card-footer{
    padding-left: 15px;
    padding-right: 15px;
    border-top:2px solid #f4f4f4;
  }
  .total{
    font-size: 1.2em;
    .precio{
      color: #468847
    }
  }
  .table{
    margin: 5px 0 5px;
  }
}
.card-header{
  background-color: #f4f4f4;
  .card-header-title{
    color: #333;
  }
}
</style>