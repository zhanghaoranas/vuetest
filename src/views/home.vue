<template>
  <div id="app">
    <el-button @click="dialogVisible = true">点击</el-button>
    <MultiLevel :formData="formData" />
    <OtherTest :testArr="formData.testArr" />
    <TableTest />
    <dialog-test :dialogVisible.sync="dialogVisible" />
    <name-slot></name-slot>
  </div>
</template>

<script>
import DialogTest from '../components/DialogTest.vue';
import MultiLevel from '../components/MultiLevel.vue';
import OtherTest from '../components/OtherTest';
import TableTest from '../components/TableTest';
import NameSlot from '../components/NameSlot.vue';
import { groupByPrototype } from '../utils';
export default {
  name: 'home',
  components: {
    MultiLevel,
    OtherTest,
    TableTest,
    DialogTest,
    NameSlot,
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
    const testData = [
      {
        a: 1,
        b: 2,
        c: 3,
      },
      {
        a: 1,
        b: 3,
        c: 3,
      },
    ];
    console.log(groupByPrototype(testData, ['a', 'c']));
  },
  activated() {
    console.log('初次进入也执行');
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
