<template>
  <div id="app">
    <el-button @click="dialogVisible = true">点击</el-button>
    <MultiLevel :formData="formData" />
    <OtherTest :testArr="formData.testArr" />
    <TableTest />
    <dialog-test :dialogVisible.sync="dialogVisible" />
  </div>
</template>

<script>
import DialogTest from '../components/DialogTest.vue';
import MultiLevel from '../components/MultiLevel.vue';
import OtherTest from '../components/OtherTest';
import TableTest from '../components/TableTest';
export default {
  name: 'home',
  components: {
    MultiLevel,
    OtherTest,
    TableTest,
    DialogTest,
  },
  data: function () {
    return {
      dialogVisible: false,
      formData: {
        test: '1',
        testArr: [111],
      },
    };
  },
  created() {
    console.log(this.$router);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
