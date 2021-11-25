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
    <TableShow v-if="false" :data="computedTabData" :option="option" :page.sync="page">
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
      let i = 10000;
      while (i > 0) {
        this.tabData.push({
          name: `姓名${i}--${i}`,
          sex: i % 2,
          id: i,
          adjustPriceOrderId: '1452608171230113794',
          adjustPriceOrderItemNo: 'I2021102500032',
          approvalGoods: 0,
          areaCode: null,
          areaId: null,
          areaName: null,
          auditOpinion: null,
          auditStatus: 0,
          auditTime: null,
          auditUser: null,
          auditUserName: null,
          createDeptId: '1410070493943316482',
          createTime: '2021-10-25 20:09:11',
          createUser: '1381884270120800257',
          currencyName: '二甲双胍格列本脲片(Ⅰ)',
          factoryName: '成都恒瑞制药有限公司',
          goodsCode: '351536',
          goodsName: '二甲双胍格列本脲片(Ⅰ)',
          goodsUnit: '盒',
          highlightShow: null,
          isNewGoods: 0,
          // itemPrices: [{ id: '1452608172060585993', adjustPriceOrderItemId: '1452608171922173961' }],
          maxLimitPrice: '0.00',
          minLimitPrice: '0.00',
          remark: null,
          specs: '30片',
          tenantId: '845446',
          updateTime: null,
          updateUser: null,
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
