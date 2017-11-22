import lovizApiService from './../lovizapi'

const lovizApiUserService = {}

lovizApiUserService.getTokenUser = function (user, pass) {
  return lovizApiService.post('/api-token-auth/', {
    username: user,
    password: pass
  })
    .then(res => res.data)
    .catch(err => err.data)
}

lovizApiUserService.getPerfil = function (token) {
  return lovizApiService.get('/api/user/perfil/', {
    headers: {
      'Authorization': 'JWT ' + token
    }
  })
    .then(res => res.data)
    .catch(err => err.data)
}

lovizApiUserService.editNombre = function (token, datos) {
  return lovizApiService.put(`/cliente/user/${datos.id}/`, datos, {
    headers: {
      'Authorization': 'JWT ' + token
    }
  })
    .then(res => res.data)
    .catch(err => err.data)
}

lovizApiUserService.crearDireccion = function (direccion) {
  const token = localStorage.getItem('token')

  return lovizApiService.post('/cliente/direcciones/', direccion, {
    headers: {
      'Authorization': 'JWT ' + token
    }
  })
  .then(res => res.data)
  .catch(err => err.data)
}

lovizApiUserService.crearUser = function (cuenta) {
  return lovizApiService.post('/ajax/crear/', cuenta)
  .then(res => res.data)
  .catch(err => err.data)
}

lovizApiUserService.resetConfirmPass = function (dato) {
  return lovizApiService.post('/auth/password/reset/confirm/', dato)
  .then(res => res.data)
  .catch(err => err.data)
}

lovizApiUserService.resetPass = function (dato) {
  return lovizApiService.post('/auth/password/reset/', dato)
  .then(res => res.data)
  .catch(err => err.data)
}

lovizApiUserService.createSuscriptor = function (dato) {
  return lovizApiService.post('/api/user/sucribirse/', dato)
  .then(res => res.data)
  .catch(err => err.data)
}

lovizApiUserService.getCupon = function (nombre) {
  return lovizApiService.get('/cliente/cupones/', {
    params: {
      nombre: nombre
    }
  })
  .then(res => res.data)
  .catch(err => err.data)
}
export default lovizApiUserService
