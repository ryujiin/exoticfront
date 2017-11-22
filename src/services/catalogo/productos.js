import lovizApiService from './../lovizapi'

const lovizApiProductoService = {}

lovizApiProductoService.getProductos = function (q) {
  const token = localStorage.getItem('token')
  if (token) {
    return lovizApiService.get('/catalogo/productos/', {
      params: q,
      headers: {
        'Authorization': 'JWT ' + token
      }
    })
      .then(res => res.data)
      .catch(err => err.data)
  } else {
    return lovizApiService.get('/catalogo/productos/', {
      params: q
    })
      .then(res => res.data)
      .catch(err => err.data)
  }
}

lovizApiProductoService.getProductoSingle = function (q) {
  const token = localStorage.getItem('token')
  if (token) {
    return lovizApiService.get('/catalogo/producto-single/', {
      params: q,
      headers: {
        'Authorization': 'JWT ' + token
      }
    })
      .then(res => res.data)
      .catch(err => err.data)
  } else {
    return lovizApiService.get('/catalogo/producto-single/', {
      params: q
    })
      .then(res => res.data)
      .catch(err => err.data)
  }
}

lovizApiProductoService.getCategorias = function () {
  return lovizApiService.get('/categoria/')
  .then(res => res.data)
  .catch(err => err.data)
}

lovizApiProductoService.getEtiquetas = function () {
  return lovizApiService.get('/etiquetas/')
  .then(res => res.data)
  .catch(err => err.data)
}

lovizApiProductoService.createComentarioProducto = function (comentario) {
  return lovizApiService.post('/comentarios/', comentario)
  .then(res => res.data)
  .catch(err => err.data)
}

lovizApiProductoService.updateComentarioProducto = function (comentario) {
  return lovizApiService.put(`/comentarios/${comentario.id}/`, comentario)
  .then(res => res.data)
  .catch(err => err.data)
}

lovizApiProductoService.getComentarioProducto = function (p) {
  return lovizApiService.get('/comentarios/', {
    params: {
      producto: p
    }
  })
  .then(res => res.data)
  .catch(err => err.data)
}
// Administracion
lovizApiProductoService.createProductosAdmin = function (producto, token) {
  return lovizApiService.post('/apiadmin/producto/', producto, {
    headers: {
      'Authorization': 'JWT ' + token
    }
  })
    .then(res => res.data)
    .catch(err => err.data)
}

lovizApiProductoService.editarProductosAdmin = function (producto) {
  const token = localStorage.getItem('token')
  return lovizApiService.put(`/apiadmin/producto/${producto.id}/`, producto, {
    headers: {
      'Authorization': 'JWT ' + token
    }
  })
    .then(res => res.data)
    .catch(err => err.data)
}

lovizApiProductoService.createCaracteristicaAdmin = function (caract, token) {
  return lovizApiService.post('/apiadmin/caracteristica_producto/', caract, {
    headers: {
      'Authorization': 'JWT ' + token
    }
  })
    .then(res => res.data)
    .catch(err => err.data)
}

lovizApiProductoService.getProductosAdmin = function (q) {
  return lovizApiService.get('/catalogo/productos/', {
    params: q
  })
    .then(res => res.data)
    .catch(err => err.data)
}

lovizApiProductoService.createProductoTalla = function (talla, token) {
  return lovizApiService.post('/apiadmin/variacion_producto/', talla, {
    headers: {
      'Authorization': 'JWT ' + token
    }
  })
    .then(res => res.data)
    .catch(err => err.data)
}

lovizApiProductoService.editProductoTalla = function (talla, token) {
  return lovizApiService.put(`/apiadmin/variacion_producto/${talla.id}/`, talla, {
    headers: {
      'Authorization': 'JWT ' + token
    }
  })
    .then(res => res.data)
    .catch(err => err.data)
}

lovizApiProductoService.getProductoSingleAdmin = function (id) {
  return lovizApiService.get(`/catalogo/producto-single/${id}`)
    .then(res => res.data)
    .catch(err => err.data)
}

lovizApiProductoService.getVariaciones = function () {
  return lovizApiService.get('/tallas/')
    .then(res => res.data)
    .catch(err => err.data)
}

export default lovizApiProductoService
