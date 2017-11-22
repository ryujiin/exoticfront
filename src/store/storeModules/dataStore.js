import lovizProductoService from '@/services/catalogo/productos'

const state = {
  tienda: {
    nombre: 'Exotic Snout',
    logo: '',
    telefono: '965376063',
    email: 'suport@exoticsnout.com',
    locacion: '',
    precio: 'S/. 50.00',
    menuTop: [
      {
        id: 1,
        texto: 'Erizos',
        link: '/catalogo/erizos'
      },
      {id: 2, texto: 'Hurones', link: '/catalogo/hurones'},
      {id: 3, texto: 'Chinchilla', link: '/catalogo/chinchilla'},
      {id: 4, texto: 'Otras Mascotas', link: '/catalogo/otras-mascotas'}
    ]
  },
  textoPageLoading: ['E', 'X', 'O', 'T', 'I', 'C'],
  pageloading: true,
  tiendaBusqueda: false,
  menuSlide: false,
  modalFoto: false,
  ComentFoto: '',
  variaciones: [],
  modalCupon: {
    mostrado: false,
    activo: false,
    cupon: ''
  }
}

const mutations = {
  changePageLoading (state, valor) {
    state.pageloading = valor
  },
  changeTiendaBusqueda (state) {
    if (state.tiendaBusqueda) {
      state.tiendaBusqueda = false
    } else {
      state.tiendaBusqueda = true
    }
  },
  changeMenuSlide (state, valor) {
    state.menuSlide = valor
  },
  changeModalFoto (state, valor) {
    state.modalFoto = valor
  },
  changeFotoComent (state, valor) {
    state.ComentFoto = valor
  },
  changeVariaciones (state, valor) {
    state.variaciones = valor
  },
  changeModalCupon (state, valor) {
    if (valor) {
      if (!state.modalCupon.mostrado) {
        state.modalCupon.mostrado = valor
        state.modalCupon.activo = valor
      }
    } else {
      state.modalCupon.activo = valor
    }
  },
  setCupon (state, valor) {
    state.modalCupon.cupon = valor
  }
}
const actions = {
  buscarVariaciones (context) {
    const promise = new Promise(function (resolve, reject) {
      lovizProductoService.getVariaciones()
      .then(res => {
        context.commit('changeVariaciones', res.results)
        resolve(res)
      })
    })
    return promise
  }
}

const getters = {
  getTienda: state => state.tienda,
  getPageloading: state => state.pageloading,
  getTiendaBusqueda: state => state.tiendaBusqueda,
  getMenuSlide: state => state.menuSlide,
  getModalFoto: state => state.modalFoto,
  getComentFoto: state => state.ComentFoto,
  getVariaciones: state => state.variaciones,
  getMoldaCupon: state => state.modalCupon,
  getTextoPageLoading: state => state.textoPageLoading
}

export default{
  state,
  mutations,
  actions,
  getters
}
