<template>
  <div>
    <div>
      <span style="float: left;margin-left: 40px">选择实验室</span>
      <select-customize-option :customizeOption="laboratoryList" v-model="laboratoryId"
                               style="float:left;width: 200px;margin: 0 0 0 10px"></select-customize-option>
    </div>
    <div style="clear: both">
      <el-tabs tab-position="left" value="todayName" style="float: left; height: 340px;" @tab-click="changeTab">
        <el-tab-pane :label="transferToday(today)" name="todayName"></el-tab-pane>
        <el-tab-pane :label="transferToday(today + 1)"></el-tab-pane>
        <el-tab-pane :label="transferToday(today + 2)"></el-tab-pane>
        <el-tab-pane :label="transferToday(today + 3)"></el-tab-pane>
        <el-tab-pane :label="transferToday(today + 4)"></el-tab-pane>
        <el-tab-pane :label="transferToday(today + 5)"></el-tab-pane>
        <el-tab-pane :label="transferToday(today + 6)"></el-tab-pane>
      </el-tabs>
      <ul class="weekul">
        <li v-for="item in items" :key="item.id" style="margin: 0; padding:0; height: 39px; width: 450px;">
          <el-button :disabled="item.isDisable" :style="item.style" plain @click="clicks(item.id)">{{item.id + 9}}:00 -
            {{item.id + 10}}:00
          </el-button>
        </li>
      </ul>
      <div style="float: left;margin: 0;padding: 0">
      <p>
        <b>按钮颜色状态说明:</b>
        <el-tag style="background-color: #AFEEEE;margin-left: 10px;width: 100px">可预定</el-tag>
        <el-tag style="background-color: #A9A9A9;color: black;width: 100px">已预定</el-tag>
        <el-tag style="background-color: #FFA07A;color:	#FF6347;width: 100px ">正在选择</el-tag>
      </p>
      <b style="float: left">申请说明:</b>
      <el-input v-model="laboratoryScheduleForm.instruction" placeholder="请输入申请说明" style="float: left; width: 310px;margin-left: 10px"></el-input>
      <el-tooltip content="添加" placement="bottom" effect="light">
        <el-button type="primary" icon="icon-tsy-new" circle @click="submitForm"
                   style="float: left; margin: 10px 0 0 30px"></el-button>
      </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>

  import selectCustomizeOption from '../../components/SelectCustomizeOption'

  import laboratoryAPI from '../../api/laboratory/LaboratoryAPI'

  import laboratoryScheduleAPI from '../../api/laboratory/LaboratoryScheduleAPI'

  export default {
    name: "doom-laboratory",

    components: {
      selectCustomizeOption,
    },

    mounted() {
      let self = this;
      self.today = new Date().getDay();
      self.getLaboratoryList();
    },

    data() {
      return {

        // 实验室列表
        laboratoryList: [],
        // 今天
        today: 0,
        // 搜索条件

        laboratoryId: '',
        searchForm: {
          laboratoryId: '',
          offset: 0
        },

        laboratoryScheduleForm: {
          laboratoryId: '',
          instruction: '',
          offset: '',
          startTime: '',
          endTime: ''
        },

        // 标记：正在选定的时间段
        pressScheduled: -1,
        // 标记：第二次选定的时间段
        againScheduled: -1,

        // 四种颜色
        // 可以预定
        notScheduled: 'background-color: #AFEEEE;width:300px;',
        // 等待审批
        pendingScheduled: 'background-color: #A9A9A9;width:300px;',
        // 已经预定
        bookingScheduled: 'background-color: #A9A9A9;width:300px;',
        // 正在选择
        selectScheduled: 'background-color: #FFA07A;width:300px;',

        selectScheduledIndex: [],

        items: [
          {
            id: 0,
            index: '',
            style: 'background-color: #AFEEEE;width:300px;border: none',
            isDisable: false
          },
          {
            id: 1,
            index: '',
            style: 'background-color: #AFEEEE;width:300px;border: none',
            isDisable: false
          },
          {
            id: 2,
            index: '',
            style: 'background-color: #AFEEEE;width:300px;border: none',
            isDisable: false
          },
          {
            id: 3,
            index: '',
            style: 'background-color: #AFEEEE;width:300px;border: none',
            isDisable: false
          },
          {
            id: 4,
            index: '',
            style: 'background-color: #AFEEEE;width:300px;border: none',
            isDisable: false
          },
          {
            id: 5,
            index: '',
            style: 'background-color: #AFEEEE;width:300px;border: none',
            isDisable: false
          },
          {
            id: 6,
            index: '',
            style: 'background-color: #AFEEEE;width:300px;border: none',
            isDisable: false
          },
          {
            id: 7,
            index: '',
            style: 'background-color: #AFEEEE;width:300px;border: none',
            isDisable: false
          },
        ],

        // 控制新增弹框
        addDialogVisible: false

      }
    },

    methods: {

      resetScheduled() {
        let self = this;
        // 重置
        self.items = [
          {
            id: 0,
            index: '',
            style: 'background-color: #AFEEEE;width:300px;border: none',
            isDisable: false
          },
          {
            id: 1,
            index: '',
            style: 'background-color: #AFEEEE;width:300px;border: none',
            isDisable: false
          },
          {
            id: 2,
            index: '',
            style: 'background-color: #AFEEEE;width:300px;border: none',
            isDisable: false
          },
          {
            id: 3,
            index: '',
            style: 'background-color: #AFEEEE;width:300px;border: none',
            isDisable: false
          },
          {
            id: 4,
            index: '',
            style: 'background-color: #AFEEEE;width:300px;border: none',
            isDisable: false
          },
          {
            id: 5,
            index: '',
            style: 'background-color: #AFEEEE;width:300px;border: none',
            isDisable: false
          },
          {
            id: 6,
            index: '',
            style: 'background-color: #AFEEEE;width:300px;border: none',
            isDisable: false
          },
          {
            id: 7,
            index: '',
            style: 'background-color: #AFEEEE;width:300px;border: none',
            isDisable: false
          },
        ];
        self.pressScheduled = -1;
        self.againScheduled = -1;
      },

      async getLaboratoryList() {
        let self = this;
        let result = await laboratoryAPI.getLaboratoryList({page: 1, row: 1000});
        if (!result.status) {
          return self.$message({
            message: result.reason,
            type: 'warning'
          });
        }
        for (let laboratory of result.records) {
          // 构造选项列表
          self.laboratoryList.push({
            value: laboratory.id,
            label: laboratory.laboratoryName
          });
        }
      },

      // 申请预定
      async submitForm() {
        let self = this;
        if (self.searchForm.laboratoryId === '') {
          return self.$message({
            message: '请选择实验室',
            type: 'warning'
          });
        }
        if (self.searchForm.instruction === '') {
          return self.$message({
            message: '请输入申请说明',
            type: 'warning'
          });
        }
        if (self.pressScheduled === -1) {
          return self.$message({
            message: '请选择申请时间段',
            type: 'warning'
          });
        }
        if (self.againScheduled === -1) {
          self.laboratoryScheduleForm.startTime = self.pressScheduled;
          self.laboratoryScheduleForm.endTime = self.pressScheduled;
        } else {
          self.laboratoryScheduleForm.startTime = self.pressScheduled > self.againScheduled ? self.againScheduled : self.pressScheduled;
          self.laboratoryScheduleForm.endTime = self.pressScheduled > self.againScheduled ? self.pressScheduled : self.againScheduled;
        }
        self.laboratoryScheduleForm.offset = self.searchForm.offset;
        self.laboratoryScheduleForm.laboratoryId = self.searchForm.laboratoryId;
        let result = await laboratoryScheduleAPI.addLaboratorySchedule(self.laboratoryScheduleForm);
        if (!result.status) {
          return self.$message({
            message: result.reason,
            type: 'warning'
          });
        } else {
          self.$message({
            message: result.reason,
            type: 'success'
          });
          // 更新
          self.getScheduleList();
        }
      },

      transferToday(val) {
        switch (val % 7) {
          case 0:
            return "星期日";
          case 1:
            return "星期一";
          case 2:
            return "星期二";
          case 3:
            return "星期三";
          case 4:
            return "星期四";
          case 5:
            return "星期五";
          case 6:
            return "星期六";
        }
      },

      changeTab(value) {
        let self = this;
        self.searchForm.offset = value.index;
        self.getScheduleList();
      },

      async getScheduleList() {
        let self = this;
        let result = await laboratoryScheduleAPI.getLaboratoryScheduleList(self.searchForm);
        self.resetScheduled();
        // 封装数据
        if (result.status) {
          for (let laboratorySchedule of result.records) {
            self.items[laboratorySchedule.period].style = laboratorySchedule.status === 0 ? self.pendingScheduled : self.bookingScheduled;
            self.items[laboratorySchedule.period].index = laboratorySchedule.id;
            self.items[laboratorySchedule.period].isDisable = true;
          }
        }
      },

      clicks(index) {
        let self = this;
        if (self.searchForm.laboratoryId === '') {
          return self.$message({
            message: '请选择实验室',
            type: 'warning'
          });
        }
        self.pressScheduled = self.againScheduled;
        console.log(self.pressScheduled + "已选按钮");
        console.log(index + "当前按钮");
        // 时间表中未被按下一个按钮
        if (-1 === self.pressScheduled) {
          // 设置按下的按钮
          self.pressScheduled = index;
          self.againScheduled = index;
          // 改变按钮颜色
          self.items[index].style = self.selectScheduled;
          // 将序号加入选择序号数组中
          self.selectScheduledIndex.push(index);
          // 当前按下与已选择按钮相同
        } else if (index === self.pressScheduled) {
          console.log("sdfasdf");
          // 重置已选择按钮
          self.pressScheduled = -1;
          self.againScheduled = -1;
          self.items[index].style = self.notScheduled;
          // 需要置空所有已选择的时间段
          for (let temp in self.selectScheduledIndex) {
            self.items[temp].style = self.notScheduled;
          }
          self.selectScheduledIndex = [];
        } else {
          // 时间表中已被按下一个按钮, 判断谁大
          let small = index > self.pressScheduled ? self.pressScheduled : index;
          let big = index > self.pressScheduled ? index : self.pressScheduled;
          // 判断是否有冲突
          for (let tempIndex = 0; tempIndex < (big - small); tempIndex++) {
            if (self.items[tempIndex + small].isDisable === true) {
              // 有冲突时间
              return self.$message({
                message: "时间冲突",
                type: 'warning'
              });
            }
          }
          // 需要置空所有已选择的时间段
          for (let temp in self.selectScheduledIndex) {
            self.items[temp].style = self.notScheduled;
          }
          self.selectScheduledIndex = [];
          //没有时间冲突，控制颜色
          for (let tempIndex = 0; tempIndex < (big + 1 - small); tempIndex++) {
            self.items[tempIndex + small].style = self.selectScheduled;
            self.selectScheduledIndex.push(tempIndex + small);
          }
          // 设置已选择按钮
          self.againScheduled = index;
        }
      }
    },


    watch: {
      laboratoryId(val) {
        let self = this;
        self.searchForm.laboratoryId = val;
        self.getScheduleList();
      }
    }
  }
</script>

<style scoped>
.weekul{
  list-style-type: none;
  float: left;
}
</style>
