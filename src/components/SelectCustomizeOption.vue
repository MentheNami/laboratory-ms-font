<template>
  <el-select v-model="optionValue" style="width: 202px; height: 40px"  filterable size="medium" clearable @change="change">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script>

  export default {
    name: "select-customize-option",
    data() {
      return {
        options: [],
        optionValue: '',
      }
    },
    props: {
      customizeOption: {
        type: Array,
        default: [],
        required: true
      },
      value: {
        value: ''
      }
    },
    created() {
      let self = this;
      self.optionValue = self.value;
      self.options = self.customizeOption;
    },

    methods: {
      async change(id) {
        this.$emit("input", id)
      }
    },

    watch: {
      value(val) {
        let self = this;
        self.optionValue = val;
      },

      customizeOption(val) {
        let self = this;
        self.options = val;
      }
    }
  }
</script>

<style scoped>

</style>
