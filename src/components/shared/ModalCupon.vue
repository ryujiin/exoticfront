<template lang="pug">
.modal(:class="{'is-active': getMoldaCupon.activo}")
  .modal-background(@click="changeModalCupon(false)")
  .modal-content
    .cupon.has-text-centered
      figure.logo
        img(src="/static/img/logooso.png" v-if="getTienda.logo")
        .title(v-else) {{getTienda.nombre}}
      .title.is-size-5 suscribete a nuestro boletin y recibe un cupon por
      .descuento 
        span.porcentaje 20
        span.des_por % 
        span.des Dscto.
      .formulario(v-if="estado == 1 || estado == 2")
        p.has-text-danger(v-show="text_error") {{text_error}}
        .field.has-addons
          .control
            input.input(v-validate="'required|email'" 
                        :class="{'input': true, 'is-danger': errors.has('email') }"
                        type='email', 
                        placeholder='Correo Electronico' v-model="email" name="email")
            p.help.is-danger(v-show="errors.has('email')") Ingrese un correo valido
          .control
            a.button.is-danger(@click="crearCupon", :class="{'is-loading': estado === 2}")
              | Obtener 20% de Dsct.
      .codigo(v-if="estado == 3")
        .title Su codigo es : {{getMoldaCupon.cupon}}
      .foter
        p.help *Se te enviara un correo electronico con el codigo de descuento 
        p.help **Este es un codigo unico vinculado a tu correo electronico, cuando utilizes este codigo se verificara que el correo con el que compras es el mismo que ingresaste.
  button.modal-close.is-large(aria-label='close' @click="changeModalCupon(false)")
</template>

<script>
import lovizApiservice from '@/services/user/lovizuser'
import {mapGetters, mapMutations} from 'vuex'

export default {
  data () {
    return {
      email: '',
      estado: 1,
      text_error: ''
    }
  },
  computed: {
    ...mapGetters(['getMoldaCupon', 'getTienda'])
  },
  methods: {
    ...mapMutations(['changeModalCupon', 'setCupon']),
    crearCupon () {
      this.$validator.validateAll()
      .then((result) => {
        this.estado = 2
        if (result) {
          lovizApiservice.createSuscriptor({email: this.email})
          .then(res => {
            if (res.email[0] === 'Ya existe suscrito con este email.') {
              this.estado = 1
              this.email = ''
              this.text_error = res.email[0]
            } else {
              this.setCupon(res.cupon)
              this.estado = 3
            }
          })
        };
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.cupon{
  background: #000;
  padding: 15px;
  color: #fff;
  border: 8px dashed #fff;
  .logo{
    width: 100px;
    margin: 0 auto;
  }
  .title{
    color: #fff;
    display: inline-block;
    text-transform: uppercase;
    margin-bottom: 0px;
    border-top: 1px dotted #ccc;
    border-bottom: 1px dotted #ccc;
    padding: 5px;
  }
  .field{
    margin: 0px 80px 10px;
  }
  .foter{
    border-top: 1px dotted;
    margin-top: 15px
  }
  .descuento{
    margin-top: -35px;
    margin-bottom: -35px;
    font-size: 2em;
    .porcentaje{
      font-size: 9pc;
    }
    .des_por{
      font-size: 3em;
    }
  }
}
</style>