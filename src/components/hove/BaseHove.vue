<template>
  <el-dialog
    class="avue-dialog"
    v-if="visible"
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
        @row-click="rowClick"
        :tableLoading="tableLoading"
        row-class-name="row-focus-within"
        v-enter
      ></avue-crud>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="handleCancel">取 消</el-button>
      <el-button size="mini" type="primary" @click="handleSure">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import enter from '@/directive/enter.js';
export default {
  name: 'BaseHove',
  directives: {
    enter,
  },
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
      tableLoading: false,
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
        height: 448, // 37.3333333 * 3 * 4 ;
        column: [],
      },
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      search: null,
      selectionList: [],
      checkBoxList: {
        list: null,
        index: 0,
      },
      canFetch: true,
      canScroll: true,
    };
  },
  mounted() {
    this.tableOption.column.push(...this.expandColumn);
    // 排除 column, 排除的优先级高于拓展的优先级。
    if (this.excludeColumn.length > 0) {
      this.tableOption.column = this.tableOption.column.filter((item) => this.excludeColumn.includes(item.prop));
    }
  },
  watch: {
    checkBoxList: {
      handler: function (n) {
        // 当用户不适用键盘时。
        if (!n.list) {
          this.getAllTableCheckBox();
        } else if (n.index > -1) {
          n.list[n.index].focus();
        }
      },
      deep: true,
    },
    'checkBoxList.index': function (n) {
      if (this.canScroll) {
        const dom = this.$refs.crud.$el.querySelector('.el-table__body-wrapper');
        // 判断当前聚焦的元素是否为最底下的那个。
        const rowHeight = 37.33333;
        const scrollTop = dom.scrollTop;
        if (11 * rowHeight + scrollTop - n * rowHeight < rowHeight) {
          dom.scrollTop = rowHeight * (n - 10);
        }
      }
    },
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
      // 部分数据恢复
      this.checkBoxList = {
        list: null,
        index: -1,
      };
      this.canFetch = true;
      // table 部分的事件监听。
      const tableCard = this.$refs.crud.$el.querySelector('.el-table');
      const form = this.$refs.crud.$el.querySelector('.avue-form');
      tableCard.addEventListener('keydown', this.keydownChange);
      const tableFocus = (event) => {
        if (event.code === 'ArrowDown' && this.checkBoxList.list) {
          this.checkBoxList.index = 0;
        }
      };
      form.addEventListener('keydown', tableFocus);
      this.$once('hook:beforeDestroy', () => {
        tableCard.removeEventListener('keydown', this.keydownChange);
      });
      this.addScrollEvent();
    },
    handleFullScreen() {
      this.isFullScreen = !this.isFullScreen;
    },
    async searchChange(params, done) {
      this.checkBoxList.index = 0;
      this.page.currentPage = 1;
      this.search = params;
      try {
        await this.getList();
      } finally {
        done && done();
      }
    },
    rowClick(row) {
      this.$refs.crud.toggleSelection([row]);
      // 当使用鼠标点击时 不需要滚动。
      this.canScroll = false;
      this.checkBoxList.index = row.$index;
      this.$nextTick(() => {
        this.canScroll = true;
      });
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
      try {
        this.tableLoading = true;
        const res = await this.request(this.page, {
          ...this.search,
          ...this.expandParams, // 拓展参数
        });
        const data = res.data.data;
        if (data) {
          if (this.page.currentPage === 1) {
            this.tableData = data.records;
          } else {
            this.tableData.push(...data.records);
          }
          if (data.records.length !== 0) {
            this.canFetch = true;
          }
          // this.tableData = data.records;
          this.page.total = 0;

          setTimeout(() => {
            this.getAllTableCheckBox();
          }, 500);
        }
      } finally {
        this.tableLoading = false;
      }
    },
    handleClose() {
      this.closeModal();
    },

    keydownChange(event) {
      // event.stopPropagation();
      event.preventDefault();
      const { code } = event;
      const { index } = this.checkBoxList;
      if (code === 'Enter') {
        this.handleSure();
      } else if (code === 'ArrowDown') {
        const length = this.tableData.length;
        if (length === index + 1) {
          this.checkBoxList.index = index;
        } else {
          this.checkBoxList.index = index + 1;
        }
      } else if (code === 'ArrowUp') {
        if (index > 0) {
          this.checkBoxList.index = index - 1;
        } else if (index === 0) {
          this.$refs.crud.$el.querySelectorAll('.avue-form input')[0].focus();
          this.checkBoxList.index = -1;
        }
      } else if (code === 'Space') {
        const row = this.tableData[this.checkBoxList.index];
        this.$refs.crud.toggleSelection([row]);
      }
    },

    getAllTableCheckBox() {
      const allTableCheckbox = this.$refs.crud.$el.querySelectorAll('.el-table__fixed-body-wrapper .el-checkbox__original');
      // 刚打开弹出 会重置数据， 由于监听了checkBoxList 所以会执行该方法， 由于获取不到数据， 所以需要判断一下。
      const list = Array.from(allTableCheckbox);
      if (list.length !== 0) {
        this.checkBoxList.list = list;
      }
    },
    addScrollEvent() {
      setTimeout(() => {
        const dom = this.$refs.crud.$el.querySelector('.el-table__body-wrapper');
        dom.addEventListener('scroll', () => {
          const { scrollHeight, scrollTop, clientHeight } = dom;
          if (scrollHeight - scrollTop - clientHeight < 50 && this.canFetch) {
            this.canFetch = false;
            this.page.currentPage = this.page.currentPage + 1;
            this.getList();
          }
        });
      });
    },
  },
};
</script>
<style lang='scss'>
.row-focus-within:focus-within {
  border-color: red;
}
.row-focus-within:focus-within > td:first-child {
  background-color: #e5f7fa !important;
}
</style>
