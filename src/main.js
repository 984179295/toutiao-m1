import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入vant
import './plugins/vant'

// 加载全局样式
import './styles/index.less'

// 加载动态设置 REM 基准值
import 'amfe-flexible'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
