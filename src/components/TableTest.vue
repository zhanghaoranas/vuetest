<template>
  <avue-crud :data="tabData" :option="option"></avue-crud>
  <!-- <el-table-show :data="tabData" :option="option"></el-table-show> -->
</template>

<script>
import AvueCrud from './ElTableShow';
export default {
  name: '',
  components: {
    AvueCrud,
  },
  data() {
    return {
      tabData: [],
      option: {
        // align: 'center',
        menuAlign: 'center',
        column: [
          {
            label: '姓名',
            prop: 'name',
          },
          {
            label: '性别',
            prop: 'sex',
          },
        ],
      },
    };
  },
  created() {
    let i = 40;
    while (i > 0) {
      this.tabData.push({
        name: 'adfa',
        sex: i % 2,
        id: i,
      });
      i--;
    }
  },
  methods: {},
};
</script>
