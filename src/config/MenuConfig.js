module.exports = [{
  name: '实验室管理',
  componentName: '/laboratory',
  sub: [{
    name: '实验室信息管理',
    componentName: '/laboratory/laboratory'
  },{
    name: '实验室预定管理',
    componentName: '/laboratory/approval'
  }]
}, {
  name: '设备管理',
  componentName: '/device',
  sub: [{
    name: '设备信息管理',
    componentName: '/device/device'
  },{
    name: '设备计划管理',
    componentName: '/device/maintain'
  }]
}, {
  name: '文件体系管理',
  componentName: '/file',
  sub: [
    {
      name: '法律法规文件',
      componentName: '/file/legal'
    }]
}, {
  name: '用户管理',
  componentName: '/user',
  sub: [
    {
      name: '实验室人员管理',
      componentName: '/user/laboratoryUser'
    }, {
      name: '基本用户管理',
      componentName: '/user/user'
    }]
}, {
  name: '投诉建议管理',
  componentName: '/customer',
  sub: [
    {
      name: '投诉处理结果',
      componentName: '/customer/complaint'
    }, {
      name: '投诉建议处理',
      componentName: '/customer/view'
    }]
}, {
  name: '系统管理',
  componentName: '/system',
  sub: [
    {
      name: '选项配置管理',
      componentName: '/system/config'
    },{
      name: '编号规则管理',
      componentName: '/system/number'
    },]
},{
  name: '个人信息管理',
    componentName: '/self',
    sub: [
    {
      name: '档案学历信息',
      componentName: '/self/baseInfo'
    }]
}];
