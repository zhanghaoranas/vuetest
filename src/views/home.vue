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
import TableTest from '../components/TableTest.vue';
import NameSlot from '../components/NameSlot.vue';
import { groupByPrototype, getChangedArr } from '../utils';

const oldArr = [
  {
    id: 1,
    name: 1,
  },
  {
    id: 2,
    name: 2,
  },
  {
    id: 3,
    name: 3,
  },
  {
    id: 4,
    name: 4,
  },
];
const newArr = [
  {
    id: 1,
    name: 1,
    flag: 'add',
  },
  {
    id: 2,
    name: 2,
    flag: 'del',
  },
  {
    id: 3,
    name: 444,
  },
  {
    id: 4,
    name: 4,
  },
];

console.log(getChangedArr(oldArr, newArr, 'flag', ['name'], 'id'));

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
  mounted() {
    console.log(4444444);
  },
  activated() {
    console.log('第一次进入就执行');
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
