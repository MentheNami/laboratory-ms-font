<template>
  <el-select style="width: 150px; height: 40px" v-model="typeValue" filterable size="16px" clearable @change="change">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.optionName"
      :value="item.id"
      >
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [],
        typeValue: '',
      }
    },
    props: {
      name: {
        type: String,
        default: ''
      },
      value: {
        default: ''
      }
    },
    created() {
      let self = this;
      self.typeValue = self.value;
      self.init();
    },
    methods: {

      async init() {
        let arr =  JSON.parse(localStorage.getItem('configOption'))
        if(arr) {
          arr.forEach((item, index) => {
            if(this.name == item.groupKey) {
              this.options = item.configOptionDetailVOList;
            }
          })
        }
      },
      async change(id) {
        this.$emit("input", id)
      }
    },

    watch: {
      value(val) {
        let self = this;
        self.typeValue = val;
      }
    }
  }
</script>
