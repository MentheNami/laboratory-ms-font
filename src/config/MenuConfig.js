module.exports = [{
  name: '实验室管理',
  level:'0',
  componentName: '/laboratory',
  sub: [{
    name: '实验室信息管理',
    level:'0',
    componentName: '/laboratory/laboratory'
  },{
    level:'10',
    name: '实验室预定管理',
    componentName: '/laboratory/approval'
  }]
}, {
  level:'0',
  name: '设备管理',
  componentName: '/device',
  sub: [{
    level:'0',
    name: '设备信息管理',
    componentName: '/device/device'
  },{
    level:'10',
    name: '设备计划管理',
    componentName: '/device/maintain'
  }]
}, {
  level:'0',
  name: '文件体系管理',
  componentName: '/file',
  sub: [
    {
      level:'0',
      name: '法律法规文件',
      componentName: '/file/legal'
    }]
}, {
  name: '用户管理',
  level:'10',
  componentName: '/user',
  sub: [
    {
      level:'10',
      name: '实验室人员管理',
      componentName: '/user/laboratoryUser'
    }, {
      level:'10',
      name: '基本用户管理',
      componentName: '/user/user'
    }]
}, {
  level:'0',
  name: '投诉建议管理',
  componentName: '/customer',
  sub: [
    {
      level:'0',
      name: '投诉处理结果',
      componentName: '/customer/complaint'
    }, {
      level:'0',
      name: '投诉建议处理',
      componentName: '/customer/view'
    }]
}, {
  level:'10',
  name: '系统管理',
  componentName: '/system',
  sub: [
    {
      level:'10',
      name: '选项配置管理',
      componentName: '/system/config'
    },{
      level:'10',
      name: '编号规则管理',
      componentName: '/system/number'
    },]
},{
  level:'0',
  name: '个人信息管理',
    componentName: '/self',
    sub: [
    {
      level:'0',
      name: '档案学历信息',
      componentName: '/self/baseInfo'
    }]
}];
