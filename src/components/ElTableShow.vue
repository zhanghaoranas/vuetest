<template>
  <div>
    <div class="table-top">
      <div>
        <slot name="menuLeft"></slot>
      </div>
      <div class="table-search" v-if="searchKey">
        <el-input type="text" size="mini" v-model="keyword" style="width: 280px" :placeholder="searchPlaceholder"></el-input>
        <div>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleSearch">搜索</el-button>
        </div>
        <el-button icon="el-icon-delete" size="mini" @click="handleClearSearch">清空</el-button>
      </div>
    </div>
    <el-table ref="table" :data="curTabData" size="mini" @selection-change="handleSelectionChange">
      <!-- 多选列 -->
      <el-table-column v-if="tableColAttributes.type" type="selection" width="55" align="center"></el-table-column>
      <!-- 序号列 -->
      <el-table-column
        v-if="tableIndex.index"
        type="index"
        :label="this.tableIndex.indexLabel"
        :align="tableColAttributes.align"
      ></el-table-column>
      <!-- 数据渲染列 -->
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :align="tableColAttributes.align"
        :render-header="item.renderHeader"
      >
        <template v-if="item.slot" v-slot="{ row }">
          <slot :name="item.prop" :row="row" size="mini"></slot>
        </template>
      </el-table-column>
      <!-- 菜单列 -->
      <el-table-column label="操作" :align="tableColAttributes.align">
        <template slot-scope="scope">
          <slot name="menu" :row="scope.row" size="mini"></slot>
        </template>
      </el-table-column>
    </el-table>
    <div class="table-footer">
      <el-pagination
        @size-change="(size) => handlePaginationChange({ number: size, type: 'pageSize' })"
        @current-change="(size) => handlePaginationChange({ number: size, type: 'currentPage' })"
        v-bind="pagination"
        :total="dataTotalNumber"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'el-table-show',
  props: {
    data: {
      type: Array,
      required: true,
    },
    option: {
      type: Object,
      required: true,
    },
    searchPlaceholder: {
      type: String,
      required: false,
    },
    page: {
      type: Object,
    },
    searchKey: {
      type: [String, Array],
    },
  },
  computed: {
    // 传入的option 暂时分为三个区域 1. columns 2. el-table所需要的属性和方法。 3. 自定义的属性。
    columns() {
      return this.option.column;
    },
    tableAttributes() {
      return {};
    },
    tableColAttributes() {
      return {
        type: this.option.selection && 'selection',
        align: this.option.align,
      };
    },
    tableIndex() {
      return {
        index: this.option.index,
        indexLabel: this.option.indexLabel || '#',
      };
    },
  },
  data() {
    return {
      keyword: '',
      curTabData: [],
      dataTotalNumber: 0,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [5, 10, 20, 30, 40, 50, 100],
        layout: 'total, sizes, prev, pager, next, jumper',
        background: true,
      },
      indexLabelName: '#tableIndexTitle', // 设置的长点避免存在重复。
    };
  },
  watch: {
    // vue 的watch 绑定时使用 for in 进行 循环变量的， 现在放在page前面这个watch 生效 放到page 后面则不生效。 但由于for in 是以任意顺序遍历一个对象的，随意还是不适用改监听 （v8中有规律涉及到常规属性和 排序属性），
    // pagination: {
    //   handler: function () {
    //     this.curTabData = this.getTableDataByPage(this.data);
    //   },
    //   deep: true,
    // },
    // page: {
    //   handler: function () {
    //     if (this.page) {
    //       this.pagination = Object.assign({}, this.page);
    //       this.dataFilter();
    //     }
    //   },
    //   deep: true,
    //   immediate: true,
    // },
    data: {
      handler: function () {
        this.dataFilter();
      },
    },
  },
  created() {
    if (this.page) {
      this.pagination = {
        ...this.pagination,
        ...Object.assign({}, this.page),
      };
      console.log(this.pagination);
    }
    this.dataFilter();
  },
  methods: {
    handleSearch() {
      this.handlePaginationChange({ number: 1, type: 'currentPage' });
    },
    dataFilter() {
      let searchData;
      const { searchKey } = this;
      if (Array.isArray(searchKey)) {
        searchData = this.data.filter((item) => {
          const multipleItem = [];
          searchKey.forEach((key) => {
            if (item[key]) {
              multipleItem.push(item[key].indexOf(this.keyword) > -1);
            }
          });
          return multipleItem.some((i) => i);
        });
      } else if (typeof searchKey === 'string') {
        searchData = this.data.filter((item) => item[searchKey].indexOf(this.keyword) > -1);
      } else {
        searchData = this.data;
      }
      this.dataTotalNumber = searchData.length;
      this.getCurTabData(searchData);
    },
    /**
     * data为经过search筛选之后的数据。
     */
    getCurTabData(data) {
      this.curTabData = this.getTableDataByPage(data);
      // 当非第一页数据删除完毕时，自动跳到上一页。 排除初始data未空数组的情况。
      if (this.data.length !== 0 && this.curTabData.length === 0 && this.pagination.currentPage > 1) {
        this.handlePaginationChange({ number: this.pagination.currentPage - 1, type: 'currentPage' });
      }
    },
    handleClearSearch() {
      this.keyword = '';
    },
    handlePaginationChange(payload) {
      this.pagination = {
        ...this.pagination,
        [payload.type]: payload.number,
      };
      if (payload.type === 'pageSize') {
        this.$emit('size-change', payload.number);
      } else if (payload.type === 'curPage') {
        this.$emit('current-change', payload.number);
      }
      if (this.page) {
        this.$emit('update:page', this.pagination);
      }
      this.dataFilter();
    },
    /**
     * 根据分页数据进行数据最终的获取。
     */
    getTableDataByPage(list) {
      const { currentPage, pageSize } = this.pagination;
      return list.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    },
    /**
     * 分页检索都会触发该方法。所以没有方法恢复之前选择的数据。（因为当list为空数组时 分不清是分页还是取消选择）
     */
    handleSelectionChange(list) {
      this.$emit('selection-change', list);
    },
  },
};
</script>
<style scoped lang="scss">
.table-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.table-search {
  width: 460px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.table-footer {
  padding: 10px 0;
  display: flex;
  justify-content: flex-end;
}
</style>
