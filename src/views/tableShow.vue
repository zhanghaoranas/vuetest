<template>
  <div class="elTableShow">
    <el-table-show :data="tabData" :option="option" :page.sync="page" searchKey="name" @select-change="selectionChange">
      <template v-slot:sex="{ row }">
        <el-input v-model="row.sex"></el-input>
      </template>
      <template slot="menuLeft">
        <span>送赠品：</span>
        <el-button size="mini" type="primary">添加赠品</el-button>
        <el-button size="mini">删除</el-button>
      </template>
      <!-- 自定义菜单按钮 -->
      <template v-slot:menu="{ type, size, row }">
        <el-button :size="size" :type="type" @click="handleDel(row)">删除</el-button>
      </template>
    </el-table-show>
  </div>
</template>

<script>
  import ElTableShow from '../components/ElTableShow';

  export default {
    name: 'tableShow',
    components: { ElTableShow },
    data() {
      return {
        tabData: [],
        option: {
          index: true,
          indexLabel: '',
          selection: true,
          align: 'center',
          menuAlign: 'center',
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
      };
    },
    created() {
      let i = 40;
      while (i > 0) {
        this.tabData.push({
          name: `姓名${i}--${i}`,
          sex: i % 2,
          id: i,
        });
        i--;
      }
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
