module.exports = [{
  name: '实验室',
  componentName: '/laboratory',
  sub: [{
    name: '实验室管理',
    componentName: '/laboratory/laboratory'
  }, {
    name: '实验室预定',
    componentName: '/laboratory/reserve'
  }, {
    name: '实验室审批',
    componentName: '/laboratory/approval'
  }]
}, {
  name: '设备',
  componentName: '/device',
  sub: [{
    name: '设备管理',
    componentName: '/device/device'
  }, {
    name: '设备验收',
    componentName: '/device/acceptance'
  }, {
    name: '保养计划',
    componentName: '/device/maintain'
  }]
}, {
  name: '文件体系',
  componentName: '/file',
  sub: [
    {
      name: '法律法规文件',
      componentName: '/file/legal'
    }]
}, {
  name: '员工',
  componentName: '/employee',
  sub: [
    {
      name: '员工管理',
      componentName: '/employee/employee'
    }]
}, {
  name: '客户',
  componentName: '/customer',
  sub: [
    {
      name: '投诉建议',
      componentName: '/customer/complaint'
    },{
      name: '查看',
      componentName: '/customer/view'
    }]
}, {
  name: '系统',
  componentName: '/system',
  sub: [
    {
      name: '选项配置',
      componentName: '/system/config'
    }]
}];
