<template>
  <avue-crud :data="tabData" :option="option" :row-style="setRowStyle">
    <template #flag="{ row }">
      <el-input v-model="row.name" @change="handleRowChange(row, 'name')"></el-input>
    </template>
  </avue-crud>
  <!-- <el-table-show :data="tabData" :option="option"></el-table-show> -->
</template>

<script>
// import AvueCrud from './ElTableShow';
import flag from '@/directive/flag.js';
export default {
  name: '',
  components: {
    // AvueCrud,
  },
  directives: {
    flag,
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
          {
            label: '状态',
            prop: 'flag',
            slot: true,
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
        flag: i % 3 === 2 ? 'add' : '',
      });
      i--;
    }
    this.originalData = JSON.parse(JSON.stringify(this.tabData));
    setTimeout(() => {
      this.tabData[2].flag = 'del';
    }, 3000);
  },
  watch: {
    tabData: {
      handler: function () {},
    },
  },
  methods: {
    setRowStyle({ row }) {
      if (row.flag === 'add') {
        return {
          backgroundColor: 'blue',
        };
      } else if (row.flag === 'edit') {
        return {
          backgroundColor: 'yellow',
        };
      } else if (row.flag === 'del') {
        return {
          backgroundColor: 'red',
        };
      }
    },
    handleRowChange(row, key) {
      row.flag = row[key] !== this.originalData[row.$index][key] ? 'edit' : '';
    },
  },
};
</script>
