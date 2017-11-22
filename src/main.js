// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from '@/store/store'

import VueCookie from 'vue-cookie'
import VueProgressBar from 'vue-progressbar'
import VeeValidate from 'vee-validate'
import VueLocalStorage from 'vue-localstorage'
import VueHead from 'vue-head'
import VueScrollTo from 'vue-scrollto'
import VueProgressiveImage from 'vue-progressive-image'
import VueAnalytics from 'vue-analytics'

const options = {
  color: '#23d160',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.use(VueScrollTo, {
  container: 'body',
  duration: 500,
  easing: 'ease',
  offset: 0,
  cancelable: true,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

Vue.use(VueHead)
Vue.use(VeeValidate)
Vue.use(VueProgressBar, options)
Vue.use(VueCookie)
Vue.use(VueProgressiveImage)

Vue.config.productionTip = false

Vue.use(VueLocalStorage, {
  name: 'ls',
  createComputed: true // created computed members from your variable declarations
})

Vue.use(VueAnalytics, {
  id: 'UA-109870526-1',
  router
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
