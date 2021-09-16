<template>
  <div class="elTableShow">
    <el-table-show :data="tabData" :option="option" :page.sync="page" searchKey="name" @select-change="selectionChange">
      <template #sex="{ row }">
        <el-input v-model="row.sex" size="mini"></el-input>
      </template>
      <template slot="menuLeft">
        <span>送赠品：</span>
        <el-button size="mini" type="primary">添加赠品</el-button>
        <el-button size="mini">删除</el-button>
      </template>
      <template #menu="{ type, size, row }">
        <el-button :size="size" :type="type" @click="handleDel(row)">删除</el-button>
      </template>
    </el-table-show>
    <TableShow :data="computedTabData" :option="option" :page.sync="page">
      <template #tableTop>
        <div>
          <div>
            <span>送赠品：</span>
            <el-button size="mini" type="primary">添加赠品</el-button>
            <el-button size="mini">删除</el-button>
          </div>
          <div>
            <el-input placeholder="检索" v-model="searchKey"></el-input>
            <el-button></el-button>
          </div>
        </div>
      </template>
      <template #sex="{ row }">
        <el-input v-model="row.sex" size="mini"></el-input>
      </template>
      <template #menu="{ type, size, row }">
        <el-button :size="size" :type="type" @click="handleDel(row)">删除</el-button>
      </template>
    </TableShow>
  </div>
</template>

<script>
import ElTableShow from '../components/ElTableShow';
import TableShow from '../components/TableShow.vue';
export default {
  name: 'tableShow',
  components: { ElTableShow, TableShow },
  data() {
    return {
      tabData: [],
      option: {
        index: true,
        indexLabel: '',
        selection: true,
        align: 'center',
        menuAlign: 'center',
        border: true,
        column: [
          {
            label: '姓名',
            prop: 'name',
          },
          {
            label: '性别',
            prop: 'sex',
            slot: true,
          },
        ],
      },
      page: {
        currentPage: 2,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40, 50, 100],
        layout: 'total, sizes, prev, pager, next, jumper',
        background: true,
      },
      searchKey: '',
    };
  },

  created() {
    setTimeout(() => {
      let i = 40;
      while (i > 0) {
        this.tabData.push({
          name: `姓名${i}--${i}`,
          sex: i % 2,
          id: i,
        });
        i--;
      }
    }, 2000);
  },
  computed: {
    computedTabData() {
      if (this.searchKey) {
        return this.tabData.filter((item) => item.name.indexOf(this.searchKey) > -1);
      } else {
        return this.tabData;
      }
    },
  },
  methods: {
    selectionChange(list) {
      console.log(list);
    },
    handleDel(row) {
      console.log(row);
    },
  },
};
</script>
<style scoped lang="scss">
.elTableShow {
  font-size: 14px;
}
</style>
