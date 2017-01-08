import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
var VueFire = require('vuefire')
var Firebase = require('firebase')

Vue.use(VueFire)
Vue.use(Element)

new Vue({
  el: '#app',
  render: h => h(App)
})
