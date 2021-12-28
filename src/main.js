import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import common from '@/assets/scss/common.css'
import appCss from "@/assets/scss/app.scss";

Vue.config.productionTip = false
Vue.use(common);
Vue.use(appCss);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
