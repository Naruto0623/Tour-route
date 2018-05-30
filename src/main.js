import Vue from 'vue'
import MintUI from 'mint-ui'
import './main/main.css'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'

Vue.use(MintUI);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
