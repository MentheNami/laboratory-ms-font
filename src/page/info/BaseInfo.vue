<template>

  <div>
    <el-tag type="danger" style="margin-bottom: 10px">个人基本信息</el-tag>
    <hr/>
    <div>
      <div style="float: left;width: 200px;margin:5px 0 0 150px"><el-tag type="primary" style="width: 200px;height:50px;padding:10px;text-align: center;color: black;font-size: 14px;"><b>姓名</b>：{{userInfoForm.realName}}</el-tag></div>
      <div style="float: left;width: 200px;margin:5px 0 0 50px"><el-tag type="primary" style="width: 200px;height:50px;padding:10px;text-align: center;color: black;font-size: 14px"><b>电话号码</b>：{{userInfoForm.cellPhone}}</el-tag></div>
      <div style="float: left;width: 200px;margin:5px 0 0 50px"><el-tag type="primary" style="width: 200px;height:50px;padding:10px;text-align: center;color: black;font-size: 14px"><b>邮箱</b>：{{userInfoForm.email}}</el-tag></div>
    </div>
    <div style="float: left">
      <div style="float: left;width: 200px;margin:15px 0 0 60px"><el-tag type="warning" style="width: 200px;height:50px;padding:10px;text-align: center;color: black;font-size: 14px"><b>毕业日期</b>：{{educationRecordForm.graduationDate}}</el-tag></div>
      <div style="float: left;width: 200px;margin:15px 0 0 30px"><el-tag type="warning" style="width: 200px;height:50px;padding:10px;text-align: center;color: black;font-size: 14px"><b>毕业院校</b>：<a :href="educationRecordForm.website" style="text-decoration: none;color:#6495ED" target="_blank">{{educationRecordForm.school}}</a></el-tag></div>
      <div style="float: left;width: 200px;margin:15px 0 0 30px"><el-tag type="warning" style="width: 200px;height:50px;padding:10px;text-align: center;color: black;font-size: 14px"><b>学历</b>：{{educationRecordForm.academicQualifications}}</el-tag></div>
      <div style="float: left;width: 220px;margin:15px 0 0 30px"><el-tag type="warning" style="width: 220px;height:50px;padding:10px;text-align: center;color: black;font-size: 14px"><b>毕业证编号</b>：{{educationRecordForm.graduationCertificateNo}}</el-tag></div>
      <div style="float: left;width: 250px;margin:15px 0 0 220px"><el-tag type="info" style="width: 250px;height:50px;padding:10px;text-align: center;color: black;font-size: 14px"><b>学位</b>：{{educationRecordForm.academicDegree}}</el-tag></div>
      <div style="float: left;width: 250px;margin:15px 0 0 30px"><el-tag type="info" style="width: 250px;height:50px;padding:10px;text-align: center;color: black;font-size: 14px"><b>学位证编号</b>：{{educationRecordForm.academicDegreeCertificateNo}}</el-tag></div>

    </div>
    <div style="float: left;width:100%;height: 100%;margin: 0 auto">
      <hr/>
      <el-tag type="success" style="margin-bottom: 10px">工作经历</el-tag>
      <el-table
        :data="workRecordList"
        empty-text="暂无工作经历"
        style="width: 80%;margin: 0 auto">
        <el-table-column
          prop="beginDate"
          label="开始时间"
          width="180"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="endDate"
          label="结束时间"
          width="180"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="companyName"
          label="工作单位"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="workPosition"
          label="职务"
          header-align="center">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

  // 引入档案学历API
  import educationRecordAPI from '../../api/info/EducationRecordAPI'
  export default {
    name: "base-info",
    data() {
      return {

        // 个人档案信息
        educationRecordForm: {},
        // 个人基本信息
        userInfoForm: {},
        // 个人工作经历
        workRecordList: [],

        selectStyle: 'color:red',
        selectStyle22: 'color:black',
        buttonStyle: ''
      }
    },

    // 组件渲染之后
    mounted() {
      let self = this;
      self.initData();
    },

    methods: {

      async initData() {
        let self = this;
        let result = await educationRecordAPI.getSelfEducationRecord();
        self.userInfoForm = result.detail.simpleUserInfoVO;
        self.educationRecordForm = result.detail.simpleEducationRecordVO;
        self.workRecordList = result.detail.simpleWorkRecordVOList;
      },

    }
  }
</script>

<style scoped>

</style>
