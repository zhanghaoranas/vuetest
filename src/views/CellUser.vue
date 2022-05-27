<template>
  <div>
    <vxe-pulldown ref="vxePulldown" @hide-panel="handleHidePanel">
      <template #default>
        <vxe-input class="cell-user" v-model.trim="inputValue" placeholder="商品选择" size="mini" @input="handleInput">
          <template #suffix>
            <i class="vxe-icon--search" @click="handleShowDialog"></i>
          </template>
        </vxe-input>
      </template>
      <template #dropdown>
        <div>
          <vxe-table
            ref="dropdownTable"
            :data="tableData"
            border
            max-height="400"
            size="mini"
            :loading="tableLoading"
            :checkbox-config="{ highlight: true }"
            :row-config="{ isHover: true, isCurrent: true }"
            :keyboard-config="{ isArrow: true }"
            @checkbox-change="tableCheckboxChange"
            @keydown="tableKeydown"
            @cell-click="tableRowClick"
          >
            <vxe-column v-if="model === 'checkbox'" type="checkbox" width="60"></vxe-column>
            <vxe-column field="goodsName" title="商品名称" min-width="200"></vxe-column>
            <vxe-column field="goodsCode" title="code" min-width="200"></vxe-column>
          </vxe-table>
        </div>
      </template>
    </vxe-pulldown>
    <CellUserDialog :visible="visible"></CellUserDialog>
  </div>
</template>
<script>
import { throttle } from "lodash";
import CellUserDialog from "@/components/CellUserDialog.vue";

const getData = function(keyword) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          goodsName: "板蓝根",
          goodsCode: "654",
          other: keyword,
        },
        {
          goodsName: "感冒冲剂",
          goodsCode: "98964",
        },
      ]);
    }, 1000);
  });
};

export default {
  name: "CellUser",
  components: {
    CellUserDialog,
  },
  props: {
    model: {
      validator: function(value) {
        return ["radio", "checkbox"].indexOf(value) !== -1;
      },
      default: "checkbox",
    },
    displayLabel: {
      type: String,
    },
  },
  data() {
    return {
      visible: false,
      inputValue: "",
      tableData: [],
      throttleInput: null,
      selected: [],
    };
  },
  computed: {
    isRadio() {
      return this.model === "radio";
    },
  },
  created() {
    this.initMethods();
  },
  beforeDestroy() {
    this.throttleInput.cancel();
  },
  methods: {
    /**
     * 初始化部分节流函数。(后续配置优化)
     *
     */
    initMethods() {
      this.throttleGetListByKeyword = throttle(this.getListByKeyword, 1000, { leading: false });
    },
    async handleInput() {
      if (this.inputValue) {
        this.tableLoading = true;
        this.$refs.vxePulldown.showPanel();
        this.throttleGetListByKeyword(this.inputValue, 222);
      }
    },
    /**
     * 检索dialog 出现。
     */
    handleShowDialog() {
      this.visible = true;
      this.hidePanel();
    },
    /**
     *
     * @param {String} keyword 请求接口获取数据
     */
    async getListByKeyword(keyword) {
      try {
        this.tableData = await getData(keyword);
        if (this.tableData.length) {
          this.tableFocus();
        }
      } finally {
        this.tableLoading = false;
      }
    },
    /**
     *
     * @param {*} param0
     * @description 表格的选中状态更改时(好像只有手动点击时才触发)
     */
    tableCheckboxChange() {
      this.selected = this.$refs.dropdownTable.getCheckboxRecords();
    },
    /**
     * @description 表格的键盘事件。
     * @param {*} param0
     */
    tableKeydown({ $event }) {
      const { code } = $event;
      switch (code) {
        case "Escape":
          this.hidePanel();
          break;
        case "Enter":
          this.enterSwitchTableChecked();
          break;
      }
    },
    /**
     * 表格聚焦，且第一行高亮（聚焦）
     */
    tableFocus() {
      this.$refs.dropdownTable.focus();
      this.$refs.dropdownTable.setCurrentRow(this.tableData[0]);
    },
    /**
     * 表格的点击事件
     */
    tableRowClick({ row, columnIndex }) {
      this.$refs.dropdownTable.setCurrentRow(row);
      // 单选直接获取当前行并且关闭面板
      if (this.isRadio) {
        this.setRadioValue(row);
      } else {
        if (columnIndex > 0) {
          this.switchTableChecked(row);
        }
      }
    },
    /**
     * enter 键控制tableChecked 切换
     */
    enterSwitchTableChecked() {
      const row = this.$refs.dropdownTable.getCurrentRecord();
      if (this.isRadio) {
        this.setRadioValue(row);
      } else {
        this.switchTableChecked(row);
      }
    },
    /**
     *
     * @param {*} row
     * @description 切换行的选中状态。
     */
    switchTableChecked(row) {
      const table = this.$refs.dropdownTable;
      if (table.isCheckedByCheckboxRow(row)) {
        table.setCheckboxRow(row, false);
      } else {
        table.setCheckboxRow(row, true);
      }
      this.$nextTick(() => {
        this.tableCheckboxChange();
      });
    },
    /**
     * 关闭面板时传递数据(通过代码控制的关闭不会触发该方法)
     */
    handleHidePanel() {
      console.log(this.selected);
    },
    /**
     *
     * @param {*} row
     * @description 单选时设置值。
     */
    setRadioValue(row) {
      this.selected = [row];
      this.hidePanel();
    },
    /**
     * 关闭面板, 并传递数据
     */
    hidePanel() {
      this.$refs.vxePulldown.hidePanel();
      console.log(this.selected);
    },
  },
};
</script>
<style scoped lang="scss">
.cell-user {
  overflow: hidden;
}
.cell-user ::v-deep .vxe-input--suffix {
  background-color: #ebeef5;
  right: 1px;
  top: 1px;
  width: 1.8em;
  height: calc(100% - 2px);
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>
