import Vue from 'vue'
import Router from 'vue-router'

// 首页
import index from "../page/Index";
// 登录
import login from '../page/Login'
// 顾客
import complaint from '../page/customer/Complaint';
import view from '../page/customer/ComplaintView';
// 设备
import device from '../page/device/Device';
import maintain from '../page/device/MaintainPlan';
// 文件体系
import legal from '../page/document/Legal';
// 用户
import user from '../page/user/User';
import laboratoryUser from '../page/user/LaboratoryUser'
// 实验室
import approval from '../page/laboratory/Approval'
import laboratory from '../page/laboratory/Laboratory'
import reserve from '../page/laboratory/Reserve'
// 系统
import config from '../page/system/ConfigGroup'
import number from '../page/system/Number'
// 个人信息
import baseInfo from '../page/info/BaseInfo'
// 用户界面
import fontPage from '../page/fontpage/FontPage'

import doomLaboratory from '../model/laboratory/DoomLaboratory'
import myComplaint from '../model/complaint/MyComplaint'
import viewFile from '../model/document/ViewFile'
import selfInfo from '../model/info/SelfInfo'

// 公共API
import ComponentAPI from '../api/Component.js'
let cookies = require('browser-cookies')

Vue.use(Router);

const router = new Router({
  routes: [
    // 登录
    {
      path: '/login',
      component: login
    },
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/fontPage',
      component: fontPage,
    },
    {
      path: '/index/fontPage',
      component: fontPage,
      children: [
        {path: 'doomLaboratory', component: doomLaboratory, name: '实验室预定'
        },
      ]
    },
    {
      path: '/index/fontPage',
      component: fontPage,
      children: [
        {path: 'myComplaint', component: myComplaint, name: '我的投诉'
        },
      ]
    },
    {
      path: '/index/fontPage',
      component: fontPage,
      children: [
        {path: 'viewFile', component: viewFile, name: '法律法规文件'
        },
      ]
    },
    {
      path: '/index/fontPage',
      component: fontPage,
      children: [
        {path: 'selfInfo', component: selfInfo, name: '个人信息'
        },
      ]
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
      name: '设备管理',
      children: [
        {path: 'device', component: device, name: '设备信息管理'},
        {path: 'maintain', component: maintain, name: '设备计划管理'},
      ]
    },
    {
      path: '/file',
      component: index,
      name: '文件体系管理',
      children: [
        {path: 'legal', component: legal, name: '法律法规文件'},
      ]
    },
    {
      path: '/user',
      component: index,
      name: '用户管理',
      children: [
        {path: 'user', component: user, name: '基本用户管理'},
        {path: 'laboratoryUser', component: laboratoryUser, name: '实验室人员管理'},
      ]
    },
    {
      path: '/laboratory',
      component: index,
      name: '实验室管理',
      children: [
        {path: 'laboratory', component: laboratory, name: '实验室信息管理'},
        {path: 'reserve', component: reserve, name: '实验室预定管理'},
        {path: 'approval', component: approval, name: '实验室审批管理'},
      ]
    },
    {
      path: '/system',
      component: index,
      name: '系统管理',
      children: [
        {path: 'config', component: config, name: '配置选项管理'},
        {path: 'number', component: number, name: '编号规则管理'},
      ]
    },
    {
      path: '/self',
      component: index,
      name: '个人信息',
      children: [
        {path: 'baseInfo', component: baseInfo, name: '基本信息'},
      ]
    },
  ]
});

// 导航守卫
router.beforeEach(async(to, from, next) => {
  if (to.fullPath == "/login") {
    next();
  } else {
    let loginStatus = cookies.get("loginStatus");
    if (loginStatus == true) {
      next();
    }
    let result = await ComponentAPI.checkLogin();
    if (result.status) {
      next();
    } else {
      next('/login');
    }
  }
});
  export default router

