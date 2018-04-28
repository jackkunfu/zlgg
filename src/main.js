// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// import proto from './basic/proto'    //  表格操作每一行需要全局的curChooseRow数据
import proto from './basic/protoScope'    //  表格操作每一行需要传递每一行的scope数据
import filter from './basic/filter'

import './basic/function'

Vue.use(proto)
Vue.use(filter)

// 全局声明 SelfTable 组件， tableManage.js挂在window上减少组件内引用
// webpack2 vue 异步引用组件
Vue.component('SelfTable', () => import('@/components/part/table.vue'))
// import tableManage from './basic/mixs/table';
import tableManage from './basic/mixs/tableScope';
window.tableManage = tableManage;

Vue.config.productionTip = false

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


