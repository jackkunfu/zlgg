import Vue from 'vue'
import Router from 'vue-router'

// 基础管理
const index = r => require.ensure([], () => r(require('@/components/views/index')), 'index');  // 首页
const resource = r => require.ensure([], () => r(require('@/components/views/resource')), 'resource');  // 素材
const playList = r => require.ensure([], () => r(require('@/components/views/playList')), 'playList');  // 播出单
const playPlan = r => require.ensure([], () => r(require('@/components/views/playPlan')), 'playPlan');  // 播出单
const uiResource = r => require.ensure([], () => r(require('@/components/views/uiResource')), 'uiResource');  // ui素材
const adOwn = r => require.ensure([], () => r(require('@/components/views/adOwn')), 'adOwn');  // 广告主
const report = r => require.ensure([], () => r(require('@/components/views/report')), 'report');  // 报表
const liftList = r => require.ensure([], () => r(require('@/components/views/liftList')), 'liftList');  // 电梯列表

Vue.use(Router)

const router =  new Router({
  routes: [{
    path: '/index',
    name: 'index',
    component: index
  },{
    path: '/liftList',
    name: 'liftList',
    component: liftList
  },,{
    path: '/resource',
    name: 'resource',
    component: resource
  },{
    path: '/playList',
    name: 'playList',
    component: playList
  },{
    path: '/playPlan',
    name: 'playPlan',
    component: playPlan
  },{
    path: '/uiResource',
    name: 'uiResource',
    component: uiResource
  },{
    path: '/adOwn',
    name: 'adOwn',
    component: adOwn
  },{
    path: '/report',
    name: 'report',
    component: report
  }]
})

const white = ['/'];
router.beforeEach((to, from, next) => {
    // 路由跳转前的钩子
    // if (white.indexOf(to.path) < 0) {
    //     if (!localStorage.saasUser) {
    //         next({
    //             path: '/login',
    //             query: { redirect: to.fullPath }
    //         })
    //     } else {
    //         next()
    //     }
    // } else {
    //     next()
    // }

    next()
})

export default router
