<template>
  <el-dialog
    class="avue-dialog"
    :visible="visible"
    width="1080px"
    :before-close="handleClose"
    :fullscreen="isFullScreen"
    append-to-body
    @close="closeModal"
    @opened="openModal"
  >
    <div slot="title" class="avue-crud__dialog__header">
      <span class="el-dialog__title">{{ title }}</span>
      <i
        style="font-size: 14px; color: #909399"
        v-if="canFull"
        @click="handleFullScreen"
        class="avue-crud__dialog__menu el-dialog__close el-icon-full-screen"
      ></i>
    </div>
    <div>
      <avue-crud
        ref="crud"
        :data="tableData"
        :page="page"
        :option="tableOption"
        @selection-change="selectionChange"
        @search-change="searchChange"
        @search-reset="searchReset"
        @current-change="currentChange"
        @size-change="sizeChange"
      ></avue-crud>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="handleCancel">取 消</el-button>
      <el-button size="mini" type="primary" @click="handleSure">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'BaseHove',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    canFull: {
      type: Boolean,
      default: false,
    },
    request: {
      type: Function,
      required: true,
    },
    expandParams: {
      type: Object,
      default: function () {
        return {};
      },
    },
    expandColumn: {
      type: Array,
      default: function () {
        return [];
      },
    },
    excludeColumn: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      isFullScreen: false,
      tableData: [],
      tableOption: {
        isDialog: true,
        dialogSearchSpan: 18,
        dialogMenuSpan: 6,
        searchShow: true,
        header: false,
        border: true,
        index: true,
        selection: true,
        addBtn: false,
        searchLabelWidth: 100,
        menu: false,
        height: 440,
        column: [],
      },
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      search: null,
      selectionList: [],
    };
  },
  mounted() {
    this.tableOption.column.push(...this.expandColumn);
    // 排除 column, 排除的优先级高于拓展的优先级。
    if (this.excludeColumn.length > 0) {
      this.tableOption.column = this.tableOption.column.filter((item) => this.excludeColumn.includes(item.prop));
    }
  },
  methods: {
    /**
     *点击取消按钮
     */
    handleCancel() {
      this.closeModal();
    },
    /**
     * 点击确认按钮
     */
    handleSure() {
      if (this.selectionList.length === 0) {
        this.$message.warning('至少选择一条数据');
      } else {
        this.$emit('deliver', this.selectionList);
        this.closeModal();
      }
    },
    closeModal() {
      this.tableData = [];
      this.isFullScreen = false;
      this.$emit('update:visible', false);
    },
    openModal() {
      this.$refs.crud.doLayout();
      this.$refs.crud.searchReset();
    },
    handleFullScreen() {
      this.isFullScreen = !this.isFullScreen;
    },
    async searchChange(params, done) {
      this.page.currentPage = 1;
      this.search = params;
      try {
        await this.getList();
      } finally {
        done && done();
      }
    },
    searchReset() {
      this.searchChange({});
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
      this.getList();
    },
    sizeChange(pageSize) {
      this.page.currentPage = 1;
      this.page.pageSize = pageSize;
      this.getList();
    },
    selectionChange(list) {
      this.selectionList = list;
    },
    async getList() {
      const res = await this.request(this.page, {
        ...this.search,
        ...this.expandParams, // 拓展参数
      });
      console.log(res);
      const data = res.data.data;
      if (data) {
        this.tableData = data.records;
        //  判断 是否显示， 处理逻辑不同。
        this.page.total = data.total;
      }
    },
    handleClose(done) {
      done;
    },
  },
};
</script>
<style scoped lang='scss'>
</style>
