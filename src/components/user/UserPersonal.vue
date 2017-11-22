<template lang="pug">
.contendio
  .box
    lv-spinner(v-if="spinner")
    h2.subtitle
      span.has-text-primary 1.-
      span Detalles Personal        
    .columns.is-multiline
      .column.is-8
        .field
          label Nombre:
          .control
            input.input(type="text" placeholder="Nombre" v-model="perfil.first_name")
        .field
          label Apellido
          .control
            input.input(type="text" placeholder="Apellido" v-model="perfil.last_name")
        .field
          label Nacimiento
        .field-body
          .field
            .control
              input.input(type="number" placeholder="DD" min="0" max="31" v-model="perfil.cliente.dia")
          .field
            .control
              input.input(type="number" placeholder="MM" min="0" max="12" v-model="perfil.cliente.mes")
          .field
            .control
              input.input(type="number" placeholder="YYYY" min="1900" max="2017" v-model="perfil.cliente.year")
        .field
          label DNI
          .control
            input.input(type="text" placeholder="DNI" v-model="perfil.cliente.dni")
      .column.is-4
        .field
          .file.is-centered.is-boxed.is-success.has-name
            label.file-label
              input.file-input(type='file', name='resume', @change="upLoadFoto")
              .perfil
                .figure.image.is-square
                  img(:src="getPerfil.cliente.foto" v-if="getPerfil.cliente.foto")
                  img(v-else, src="/static/img/avatar.png")
      .column.is-12.has-text-centered
        button.button.is-primary.is-medium(type="submit", @click="enviarPerfil") Actualizar
    h2.subtitle
      span.has-text-primary 2.-
      span Informacion de Ingreso
    .columns.is-multiline
      .column.is-12
        .notification.is-danger.has-text-centered.is-small(:class="{'activo' : this.error.es_error}" v-if="error.es_error") {{error.mensaje}}
      .column.is-6
        .field
          label Correo Electronico
            span.has-text-danger (*)            
          .control
            input.input(type="email" v-model="perfil.email")
      .column.is-6
        .field
          label Contraseña Actual
            span.has-text-danger (*)
          .control
            input.input(type="password" placeholder="contraseña actual" v-model="pass")
      .column.is-6
        .field
          label Nueva Contraseña
            span.has-text-danger (*)
          .control
            input.input(type="password" placeholder="nueva contraseña" v-model="newpass")
      .column.is-6
        .field
          label Repita Contraseña
            span.has-text-danger (*)
          .control
            input.input(type="password" placeholder="Repita su nueva contraseña" v-model="newpass2")
      .column.is-12.has-text-centered
        button.button.is-primary.is-medium(type="submit") Guardar

</template>

<script>
import lvSpinner from '@/components/shared/spinner.vue'

import lovizApiUser from '@/services/user/lovizuser'
import { editProfileFoto } from '@/services/axios/lovizApiImage'

import {mapGetters, mapActions} from 'vuex'

export default {
  components: {
    lvSpinner
  },
  data () {
    return {
      perfil: {
        first_name: '',
        last_name: '',
        email: '',
        cliente: {
          year: null,
          dia: null,
          mes: null,
          dni: '',
          foto: ''
        }
      },
      pass: '',
      newpass: '',
      newpass2: '',
      envia: false,
      spinner: false,
      error: {
        mensaje: '',
        es_error: false
      }
    }
  },
  computed: {
    ...mapGetters(['getPerfil', 'getToken'])
  },
  methods: {
    ...mapActions(['getUserPerfil']),
    enviarPerfil () {
      const datos = {
        id: this.getPerfil.id,
        username: this.perfil.email,
        first_name: this.perfil.first_name,
        last_name: this.perfil.last_name,
        email: this.perfil.email
      }
      lovizApiUser.editNombre(this.getToken, datos)
      .then(res => {
        console.log(res)
      })
    },
    upLoadFoto (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      // this.createImage(files[0])

      var formData = new FormData()
      formData.append('usuario', this.getPerfil.id)
      formData.append('foto', files[0], files[0].name)
      editProfileFoto(formData, this.getPerfil.cliente.id, this.getToken)
      .then(res => {
        this.getUserPerfil()
      })
    },
    errorMesaje (texto, input) {
      this.error.es_error = true
      this.error.mensaje = texto
      if (this.error.es_error) {
        setTimeout(() => {
          this.error.es_error = false
        }, 5000)
      }
    }
  },
  mounted () {
    if (this.getPerfil.id) {
      this.perfil = this.getPerfil
      this.cliente = this.getPerfil.cliente
    }
  }
}
</script>

<style lang="scss" scoped>
.perfil{
  margin: 0 auto;
  width: 230px;
  cursor: pointer;
  img{
    border-radius: 50%;
  }
}
</style>