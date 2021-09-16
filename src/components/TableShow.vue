<template>
  <div>
    <div v-if="$slots.tableTop">
      <slot name="tableTop"></slot>
    </div>
    <el-table
      ref="table"
      :data="curTabData"
      size="mini"
      :border="tableAttributes.border"
      @selection-change="handleSelectionChange"
      :header-row-style="{ wordBreak: 'break-word', color: 'rgba(0, 0, 0, 0.85)', fontWeight: 500 }"
      :header-cell-style="{ backgroundColor: '#fafafa' }"
    >
      <!-- 多选列 -->
      <el-table-column v-if="tableColAttributes.type" type="selection" width="55" align="center" />
      <!-- 序号列 -->
      <el-table-column v-if="tableIndex.index" type="index" :label="this.tableIndex.indexLabel" :align="tableColAttributes.align" />
      <!-- 数据渲染列 -->
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :align="item.align || tableColAttributes.align"
        :width="item.width"
        :render-header="item.renderHeader"
      >
        <template v-if="item.slot" v-slot="{ row }">
          <slot :name="item.prop" :row="row" size="mini"></slot>
        </template>
      </el-table-column>
      <!-- 菜单列 -->
      <el-table-column v-if="menuColumn" label="操作" :align="tableColAttributes.align">
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
// 数据只是单纯的数据展示， 数据的筛选在父组件中(计算属性)。
/**
 * props:
 * 列表数据
 * data: [],
 * 表格配置
 * option: {
 *  index: Boolean,自定义索引
 *  indexLabel: String 自定义索引的列标题
 *  border: Boolean, 
 *  column：Object{
 *    prop: String,
 *    label: String,
 *    renderHeader: renderFunction
 *  }
 * }

 * 分页配置
 *
 * page:Object {
 *  currentPage: 1,
 *  pageSize: 10,
 *  pageSizes: [5, 10, 20, 30, 40, 50, 100],
 *  layout: 'total, sizes, prev, pager, next, jumper',
 *  background: true,
 *
 * }
 */

export default {
  name: 'table-show',
  props: {
    data: {
      type: Array,
      required: true,
    },
    option: {
      type: Object,
      required: true,
    },
    page: {
      type: Object,
    },
  },

  data() {
    return {
      curTabData: [],
      dataTotalNumber: 0,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [5, 10, 20, 30, 40, 50, 100],
        layout: 'total, sizes, prev, pager, next, jumper',
        background: true,
      },
      indexLabelName: '#tableIndexTitle', // 设置的长一些，避免存在重复。
    };
  },
  computed: {
    // 传入的option 暂时分为三个区域 1. columns 2. el-table自身所需要的属性和方法。 3. 自定义的属性。
    columns() {
      return this.option.column;
    },
    tableAttributes() {
      return {
        border: this.option.border,
      };
    },
    tableColAttributes() {
      return {
        type: this.option.selection && 'selection',
        align: this.option.align,
      };
    },
    /**
     *
     */
    tableIndex() {
      return {
        index: this.option.index,
        indexLabel: this.option.indexLabel || '#',
      };
    },
    /**
     * 是否存在操作列, 默认为 true
     */
    menuColumn() {
      if (this.option.menu === undefined) return true;
      return this.option.menu;
    },
  },
  watch: {
    data: {
      handler: function () {
        // 数据更改，恢复为第一页。
        this.dataFilter();
      },
    },
  },
  created() {
    console.log(this);
    if (this.page) {
      this.pagination = {
        ...this.pagination,
        ...Object.assign({}, this.page),
      };
    }
    this.dataFilter();
  },
  methods: {
    dataFilter() {
      this.dataTotalNumber = this.data.length;
      this.getCurTabData(this.data);
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
.table-footer {
  padding: 10px 0;
  display: flex;
  justify-content: flex-end;
}
</style>
