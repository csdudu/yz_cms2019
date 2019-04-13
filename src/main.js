import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import tinymce from 'tinymce';
window.tinymce = tinymce;
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // Internationalization
import './icons' // icon
import './permission' // permission control
import './utils/errorLog' // error log

import * as filters from './filters' // global filters

import { mockXHR } from '../mock' // simulation data
import * as dudu from '@dudu/index' // 引入自定义组件
import req from '@/utils/req'   //自定义ajax实例

for (let key in dudu) {
	// 注册自定义组件
	Vue.component(dudu[key].name, dudu[key]);
}
// mock api in github pages site build
if (process.env.NODE_ENV === 'production') { mockXHR() }

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})

const common = {
  install: function (Vue, options) {

    Vue.prototype.$req = function(para) {
      return req(para)
    };

  }
}

Vue.use(common)