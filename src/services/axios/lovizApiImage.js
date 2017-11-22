import * as axios from 'axios'

// const BASE_URL = 'http://localhost:8000'
const BASE_URL = 'https://exoticsnout.herokuapp.com/'

function upload (formData) {
  const url = `${BASE_URL}/comentarioimgs/`
  return axios.post(url, formData)
  .then(res => res.data)
  .catch(err => err.data)
}

function editProfileFoto (formData, id, token) {
  const url = `${BASE_URL}/cliente/cliente/${id}/`
  return axios.put(url, formData, {
    headers: {
      'Authorization': 'JWT ' + token
    }
  })
  .then(res => res.data)
  .catch(err => err.data)
}

function uploadImageProducto (formData, token) {
  const url = `${BASE_URL}/apiadmin/imagen_producto/`
  return axios.post(url, formData, {
    headers: {
      'Authorization': 'JWT ' + token
    }
  })
  .then(res => res.data)
  .catch(err => err.data)
}

function deleteImageProducto (token, id) {
  const url = `${BASE_URL}/apiadmin/imagen_producto/${id}/`
  return axios.delete(url, {
    headers: {
      'Authorization': 'JWT ' + token
    }
  })
  .then(res => res.data)
  .catch(err => err.data)
}

export { upload, editProfileFoto, uploadImageProducto, deleteImageProducto }
