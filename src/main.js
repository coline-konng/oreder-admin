import Vue from 'vue';
import App from './App.vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// 1.引入axios
import axios from 'axios';

Vue.use(iView);
// 2.把axios绑定到vue实例的属性$axios
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')