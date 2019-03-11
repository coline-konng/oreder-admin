// 专门存储用户的数据，和修改用户数据的方法
import axios from 'axios';
export default {
    //使用命名空间区分开来
    namespaced: 'user',
    //初始数据
    state: {
        username: localStorage.getItem("username") || '',
        identity: localStorage.getItem("identity") || ''
    },
    //命令和执行
    actions: {
        //登录
        login({ state }, data) {
            var p = new Promise((resolve, reject) => {
                //resolve，reject，分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数。
                axios({
                    url: "/admin/account/login",
                    method: "POST",
                    data,
                    withCredentials: true
                }).then(res => {
                    const {
                        status,
                        message
                    } = res.data;
                    if (status == 0) {
                        //console.log(res);
                        // 把接口返回的值更新store下的数据
                        state.username = message.uname;
                        state.identity = message.realname;
                        //把用户信息写入本地存储,避免刷新页面时用户信息的丢失
                        localStorage.setItem('username', message.uname);
                        localStorage.setItem('identity', message.realname);
                    }
                    //resolve()中判断是否登录成功，成功返回上一页，失败提示信息
                    resolve(res.data);
                });
            });
            return p;
        }
    }
}