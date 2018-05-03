import Vue from 'vue'
import Router from 'vue-router'

// 首页
import index from "../page/Index";
// 顾客
import complaint from '../page/customer/Complaint';
import view from '../page/customer/ComplaintView';
// 设备
import device from '../page/device/Device';
import acceptance from '../page/device/DeviceAcceptance';
import maintain from '../page/device/MaintainPlan';
// 文件体系
import legal from '../page/document/Legal';
// 员工
import user from '../page/employee/Employee';
// 实验室
import approval from '../page/laboratory/Approval'
import laboratory from '../page/laboratory/Laboratory'
import reserve from '../page/laboratory/Reserve'
// 系统
import config from '../page/system/ConfigGroup'

Vue.use(Router);

const router  = new Router({
  routes: [
    // 跳转登录
    // {
    //   path: '/',
    //   component: login,
    // },
    {
      path: '/employee',
      redirect: '/employee/employee'
    },
    {
      path: '/customer',
      component: index,
      name: '顾客管理',
      children: [
        {path: 'complaint', component: complaint, name: '投诉意见'},
        {path: 'view', component: view, name: '查看'},
      ]
    },
    {
      path: '/device',
      component: index,
      name: '设备',
      children: [
        {path: 'device', component: device, name: '设备管理'},
        {path: 'acceptance', component: acceptance, name: '设备验收'},
        {path: 'maintain', component: maintain, name: '保养计划'},
      ]
    },
    {
      path: '/file',
      component: index,
      name: '文件体系',
      children: [
        {path: 'legal', component: legal, name: '法律法规文件'},
      ]
    },
    {
      path: '/user',
      component: index,
      name: '员工',
      children: [
        {path: 'user', component: user, name: '员工'},
      ]
    },
    {
      path: '/laboratory',
      component: index,
      name: '实验室',
      children: [
        {path: 'laboratory', component: laboratory, name: '实验室管理'},
        {path: 'reserve', component: reserve, name: '实验室预定'},
        {path: 'approval', component: approval, name: '实验室审批'},
      ]
    },
    {
      path: '/system',
      component: index,
      name: '系统管理',
      children: [
        {path: 'config', component: config, name: '配置选项'},
      ]
    },
  ]
});

// 导航守卫
// router.beforeEach(async(to, from, next) => {
//   if (to.fullPath == "/login") {
//     next();
//   } else {
//     let loginStatus = cookies.get("loginStatus");
//     if (loginStatus == true) {
//       next();
//     }
//     let result = await ComponentAPI.checkLogin();
//     if (result.status) {
//       next();
//     } else {
//       next('/login');
//     }
//   }
// });

export default router
