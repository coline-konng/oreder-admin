import Vue from 'vue';
import App from './App.vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// 1.引入axios
import axios from 'axios';
// 引入路由模块
import VueRouter from "vue-router";

// 导入组件
import Login from './pages/Login.vue';
import Admin from './pages/Admin.vue';
import OrderList from './pages/order/OrderList.vue';
import GoodsList from './pages/goods/GoodsList.vue';
import CategoryList from './pages/category/CategoryList.vue';
import AccountList from './pages/account/AccountList.vue';
import OrderEdit from './pages/order/OrderEdit.vue';
import OrderDetail from './pages/order/OrderDetail.vue';
// 引入store
import store from "./store";

// 注册路由插件
Vue.use(VueRouter);

Vue.use(iView);
//设置axios请求的基本地址
axios.defaults.baseURL = 'http://127.0.0.1:8899';
// 2.把axios绑定到vue实例的属性$axios
Vue.prototype.$axios = axios;
Vue.config.productionTip = false


//配置路由
const routes = [{
    path: '/',
    redirect: '/admin'
}, {
    path: '/login',
    component: Login,
    meta: '登录页'
}, {
    path: '/admin',
    component: Admin,
    meta: '首页',
    redirect: '/admin/goods-list',
    children: [{
            path: 'goods-list',
            component: GoodsList,
            meta: '商品管理'
        },
        {
            path: 'category-list',
            component: CategoryList,
            meta: '栏目管理'
        },
        {
            path: 'account-list',
            component: AccountList,
            meta: '会员订单'
        },
        {
            path: 'order-list',
            component: OrderList,
            meta: '订单管理'
        },
        {
            path: 'order-edit/:id',
            component: OrderEdit,
            meta: '订单编辑'
        },
        {
            path: 'order-detail/:id',
            component: OrderDetail,
            meta: '订单详情'
        },
    ]
}];
//创建路由对象
const router = new VueRouter({
    routes
});
new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app')