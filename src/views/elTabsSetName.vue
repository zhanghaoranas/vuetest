<template>
  <div>
    <h4>测试el-tabs value的自动转换</h4>
    <el-tabs :value="active" :beforeLeave="tabsChange">
      <el-tab-pane label="a" name="a">a</el-tab-pane>
      <el-tab-pane label="b" name="b" @tab-click="active = 'c'">b</el-tab-pane>
      <el-tab-pane label="c" name="c">c</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      active: 'c',
    };
  },
  mounted() {},
  methods: {
    tabsChange(n, o) {
      console.log(n, o);
      return false;
    },
  },
};
</script>
<style scoped lang='scss'>
</style>