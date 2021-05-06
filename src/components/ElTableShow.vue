<template>
  <div>
    <div class="table-top">
      <div>
        <slot name="menuLeft"></slot>
      </div>
      <div class="table-search" v-if="searchKey">
        <el-input type="text" size="mini" v-model="keyword" :placeholder="searchPlaceholder" />
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleSearch">搜索</el-button>
        <el-button icon="el-icon-delete" size="mini" @click="handleClearSearch">清空</el-button>
      </div>
    </div>
    <el-table :data="curTabData" type="selection" @selection-change="handleSelectionChange">
      <el-table-column v-for="(item, index) in columns" :key="index" :prop="item.prop" :label="item.label"></el-table-column>
      <el-table-column label="操作">
        <slot name="menu"></slot>
      </el-table-column>
    </el-table>
    <div>
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
    dataTotalNumber() {
      if (this.searchData.length) {
        return this.searchData.length;
      }
      return this.data.length;
    },
    // 传入的option 暂时分为三个区域 1. columns 2. el-table所需要的属性和方法。 3. 自定义的属性。
    columns() {
      return this.option.column;
    },
  },
  data() {
    return {
      keyword: '',
      curTabData: [],
      searchData: [],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40, 50, 100],
        layout: 'total, sizes, prev, pager, next, jumper',
        background: true,
      },
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
    page: {
      handler: function () {
        if (this.page) {
          this.pagination = Object.assign({}, this.page);
          this.curTabData = this.getTableDataByPage(this.data);
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    if (!this.page) {
      this.curTabData = this.getTableDataByPage(this.data);
    }
  },
  methods: {
    handleSearch() {
      this.handlePaginationChange({ number: 1, type: 'currentPage' });
      this.$nextTick(() => {
        let searchData;
        const { searchKey } = this;
        if (Array.isArray(searchKey)) {
          searchData = this.data.filter((item) => {
            const multipleItem = [];
            searchKey.forEach((key) => {
              multipleItem.push(item[key].indexOf(this.keyword) > -1);
            });
            return multipleItem.some((i) => i);
          });
        } else if (typeof searchKey === 'string') {
          searchData = this.data.filter((item) => item[searchKey].indexOf(this.keyword) > -1);
        }
        this.searchData = searchData;
        this.curTabData = this.getTableDataByPage(searchData);
      });
    },
    handleClearSearch() {
      this.keyword = '';
    },
    handlePaginationChange(payload) {
      console.log(payload);
      const pageInfo = {
        ...this.pagination,
        [payload.type]: payload.number,
      };
      if (this.page) {
        this.$emit('update:page', pageInfo);
      } else {
        this.pagination = pageInfo;
        this.curTabData = this.getTableDataByPage(this.data);
      }
    },
    getTableDataByPage(list) {
      const { currentPage, pageSize } = this.pagination;
      return list.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    },
    handleSelectionChange() {
      // 1.
    },
  },
};
</script>
<style scoped lang='scss'>
.table-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.table-search {
  width: 460px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>