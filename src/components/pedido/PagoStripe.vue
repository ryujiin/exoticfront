<template lang="pug">
.stripe
  form
    .group
      label
        span Nombre
        input.field(name="cardholder-name" placeholder="Enrique Lopez" :value="nombre")
      label
        span Telefono
        input.field(placeholder="(051) 456-7890" type="tel" :value="telefono")
    .group
      label
        span Tarjeta
        #card-element.field
    button.button.is-primary(type="submit" :disabled="enviandose" @click="changePedidoProcesando(true)") 
      span Total a Pagar
      span.icon-keyboard_arrow_right
      strong  S/. {{getPedido.total}}
    .outcome
      .error(role="alert")
      .success Felicidades!!! Su pago se Proceso Exitosamente su token es
        span.token
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'

import lovizApiPedidoService from '@/services/pedido/pedido'

export default {
  computed: {
    ...mapGetters(['getPerfil', 'getPedido', 'getCartNow']),
    nombre () {
      return `${this.getPerfil.first_name} ${this.getPerfil.last_name}`
    },
    telefono () {
      const direcciones = this.getPerfil.direcciones
      for (var index in direcciones) {
        if (direcciones[index].id === this.getPedido.direccion_envio) {
          return direcciones[index].telefono
        }
      }
    }
  },
  data () {
    return {
      formNumber: null,
      formTitular: '',
      formFecha: '',
      formCVV: null,
      listo: false,
      enviandose: false
    }
  },
  methods: {
    ...mapMutations(['changePedidoProcesando', 'setCartInitialData']),
    ...mapActions(['buscarPedido']),
    EnviarForm (token) {
      const pago = {
        'stripeToken': token,
        'carro': this.getCartNow.id
      }
      lovizApiPedidoService.pagoStripe(pago)
      .then(res => {
        this.changePedidoProcesando(false)
        this.setCartInitialData()
        this.buscarPedido(this.getPedido.id)
        // this.$router.push({name: 'gracias', params: { pedido: this.getPedido.numero_pedido }})
      })
    }
  },
  mounted () {
    const self = this
    // var stripe = window.Stripe('pk_test_Gv5V5DpIyVOvL4SaurgoEpBN')
    var stripe = window.Stripe('pk_live_RMss6jsZ1PNqd3BFMpJfdF3e')
    var elements = stripe.elements()
    var card = elements.create('card', {
      style: {
        base: {
          iconColor: '#666EE8',
          color: '#31325F',
          lineHeight: '40px',
          fontWeight: 300,
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSize: '15px',
          '::placeholder': {
            color: '#CFD7E0'
          }
        }
      }
    })

    card.mount('#card-element')

    var inputs = document.querySelectorAll('input.field')
    Array.prototype.forEach.call(inputs, function (input) {
      input.addEventListener('focus', function () {
        input.classList.add('is-focused')
      })
      input.addEventListener('blur', function () {
        input.classList.remove('is-focused')
      })
      input.addEventListener('keyup', function () {
        if (input.value.length === 0) {
          input.classList.add('is-empty')
        } else {
          input.classList.remove('is-empty')
        }
      })
    })

    function setOutcome (result) {
      var successElement = document.querySelector('.success')
      var errorElement = document.querySelector('.error')
      successElement.classList.remove('visible')
      errorElement.classList.remove('visible')

      if (result.token) {
        // Comienza mi Codigo para enviar el token a mi server
        self.EnviarForm(result.token.id)
      } else if (result.error) {
        self.changePedidoProcesando(false)
        errorElement.textContent = result.error.message
        errorElement.classList.add('visible')
      }
    }

    card.on('change', function (event) {
      setOutcome(event)
    })

    document.querySelector('form').addEventListener('submit', function (e) {
      e.preventDefault()
      var form = document.querySelector('form')
      var extraDetails = {
        name: form.querySelector('input[name=cardholder-name]').value
      }
      stripe.createToken(card, extraDetails).then(setOutcome)
    })
  }
}
</script>

<style lang="scss">
.stripe{
  width: 95%;
  margin: 0 auto;
  form {
    width: 100%;
    margin: 20px auto;
  }

  .group {
    background: white;
    box-shadow: 0 7px 14px 0 rgba(49,49,93,0.10),
                0 3px 6px 0 rgba(0,0,0,0.08);
    border-radius: 4px;
    margin-bottom: 20px;
  }

  label {
    position: relative;
    color: #8898AA;
    font-weight: 300;
    height: 40px;
    line-height: 40px;
    margin-left: 20px;
    display: block;
  }

  .group label:not(:last-child) {
    border-bottom: 1px solid #F0F5FA;
  }

  label > span {
    width: 20%;
    text-align: right;
    float: left;
  }

  .field {
    background: transparent;
    font-weight: 300;
    border: 0;
    color: #31325F;
    outline: none;
    padding-right: 10px;
    padding-left: 10px;
    cursor: text;
    width: 70%;
    height: 40px;
    float: right;
  }

  .field::-webkit-input-placeholder { color: #CFD7E0; }
  .field::-moz-placeholder { color: #CFD7E0; }
  .field:-ms-input-placeholder { color: #CFD7E0; }

  button {
    float: left;
    display: block;
    background: #666EE8;
    color: white;
    box-shadow: 0 7px 14px 0 rgba(49,49,93,0.10),
                0 3px 6px 0 rgba(0,0,0,0.08);
    border-radius: 4px;
    border: 0;
    margin-top: 20px;
    font-size: 15px;
    font-weight: 400;
    width: 100%;
    height: 40px;
    line-height: 38px;
    outline: none;
  }

  button:focus {
    background: #555ABF;
  }

  button:active {
    background: #43458B;
  }

  .outcome {
    float: left;
    width: 100%;
    padding-top: 8px;
    min-height: 24px;
    text-align: center;
  }

  .success, .error {
    display: none;
    font-size: 13px;
  }

  .success.visible, .error.visible {
    display: inline;
  }

  .error {
    color: #E4584C;
  }

  .success {
    color: #666EE8;
  }

  .success .token {
    font-weight: 500;
    font-size: 13px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>