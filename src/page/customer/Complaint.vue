<template>
    <el-row>
      <el-col :span="8" v-for="item in picList" :key="item" :offset="item.index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.path" class="image">
          <div style="padding: 14px;">
            <span>{{item.name}}</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
</template>

<script>
  // 用于用户进行投诉

    export default {
        name: "complaint",
      data() {
        return {
          currentDate: new Date(),
          picList: [
            {index : 0, path:'http://localhost:8080/OTA/饼干.jpg', name: '好吃的饼干'},
            {index : 1, path:'http://localhost:8080/OTA/logo.png', name: '好吃的VUE'}
          ]
        };
      },

      mounted() {
          let self = this;
          // 通过调用API获取url
        // self.url = 'logo.png';
      }
    }
</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
