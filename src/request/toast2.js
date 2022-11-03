import Toast from "../components/Toast2.vue";
//v2用法
let NewToast = {
    install: function (Vue) {
        //创建vue插件，官方地址https://cn.vuejs.org/v2/guide/plugins.html
        let newToast = Vue.extend(Toast); //创建vue构造器,官方地址https://cn.vuejs.org/v2/api/#Vue-extend
        let toast = new newToast(); //创建实例
        document.body.appendChild(toast.$mount().$el); //挂载
        Vue.prototype.$Toast = function (text) {
            toast.isshow = true; // 传入props
            toast.text = text; // 传入props
        };
    },
};
export { NewToast };
