import lovizProductoService from '@/services/catalogo/productos'

const state = {
  productoActual: {},
  productos: [],
  tallaSelecionada: {},
  formComent: false
}

const getters = {
  getproductoActual: state => state.productoActual,
  getTallaSeleccionada: state => state.tallaSelecionada,
  getFormComent: state => state.formComent
}

const mutations = {
  selecionTalla (state, talla) {
    state.tallaSelecionada = talla
  },
  verComentario (state, valor) {
    state.formComent = valor
  }
}

const actions = {
  buscarProducto (context, slug) {
    const promise = new Promise(function (resolve, reject) {
      state.tallaSelecionada = {}
      lovizProductoService.getProductoSingle({'slug': slug})
        .then(res => {
          if (res.count === 1) {
            context.state.productoActual = res.results[0]
          }
          resolve(res)
        })
    })
    return promise
  },
  editarProducto (context, producto) {
    const promise = new Promise(function (resolve, reject) {
      lovizProductoService.editarProductosAdmin(producto)
        .then(res => {
          resolve(res)
        })
    })
    return promise
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
