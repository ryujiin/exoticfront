<template lang="pug">
div
  form(enctype='multipart/form-data', novalidate='', v-if='isInitial || isSaving')
    h1 Upload images
    .dropbox
      input.input-file(type='file', multiple='', :name='uploadFieldName', :disabled='isSaving', @change='filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length', accept='image/*')
      p(v-if='isInitial')
        | Drag your file(s) here to begin
        br
        |  or click to browse
      p(v-if='isSaving')
        | Uploading {{ fileCount }} files...
  // SUCCESS
  div(v-if='isSuccess')
    h2 Subiste {{ uploadedFiles.length }} Imagene(s) Correctamente.
    p
      a(href='javascript:void(0)', @click='reset()') Subir Otras Imagenes
    .columns
      .column.is-3(v-for='item in uploadedFiles')
        .box
          figure.image
            img(:src="item.imagen_thum")
  // FAILED
  div(v-if='isFailed')
    h2 Subiste failed.
    p
      a(href='javascript:void(0)', @click='reset()') Try again
    pre.
      \n{{ uploadError }}    


</template>

<script>
  import {mapGetters} from 'vuex'
  import { uploadImageProducto } from '@/services/axios/lovizApiImage'

  const STATUS_INITIAL = 0
  const STATUS_SAVING = 1
  const STATUS_SUCCESS = 2
  const STATUS_FAILED = 3

  export default {
    props: ['producto'],
    name: 'uploadedFiles',
    data () {
      return {
        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        uploadFieldName: 'photos'
      }
    },
    computed: {
      ...mapGetters(['getToken']),
      isInitial () {
        return this.currentStatus === STATUS_INITIAL
      },
      isSaving () {
        return this.currentStatus === STATUS_SAVING
      },
      isSuccess () {
        return this.currentStatus === STATUS_SUCCESS
      },
      isFailed () {
        return this.currentStatus === STATUS_FAILED
      }
    },
    methods: {
      reset () {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL
        this.uploadedFiles = []
        this.uploadError = null
      },
      save (formData) {
        // upload data to the server
        this.currentStatus = STATUS_SAVING

        uploadImageProducto(formData, this.getToken)
          .then(x => {
            this.uploadedFiles.push(x)
            this.currentStatus = STATUS_SUCCESS
          })
          .catch(err => {
            this.uploadError = err.response
            this.currentStatus = STATUS_FAILED
          })
      },
      filesChange (fieldName, fileList) {
        // handle file changes
        if (!fileList.length) return

        var i
        // append the files to FormData
        for (i = 0; i < fileList.length; i++) {
          var formData = new FormData()
          formData.append('producto', this.producto.id)
          formData.append('foto', fileList[i], fileList[i].name)
          this.save(formData)
        }
      }
    },
    mounted () {
      this.reset()
    }
  }
</script>

<style lang="scss" scoped>
.dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>