<template>
  <vxe-modal title="用户选择" :value="visible" width="1024" min-width="980" height="700" min-height="560" showFooter show-footer>
    <template #default>
      <vxe-table
        show-overflow
        border
        auto-resize
        height="600"
        :data="tableData"
        :checkbox-config="{ highlight: true }"
        :row-config="{ isHover: true, isCurrent: true }"
        :keyboard-config="{ isArrow: true }"
        @checkbox-change="tableCheckboxChange"
        @keydown="tableKeydown"
        @cell-click="tableRowClick"
      >
        <vxe-column v-if="model === 'checkbox'" type="checkbox" width="60"></vxe-column>
        <vxe-column type="seq" width="60"></vxe-column>
        <vxe-column field="name" title="app.body.label.name"></vxe-column>
        <vxe-column field="sex" title="app.body.label.sex"></vxe-column>
        <vxe-column field="age" title="app.body.label.age"></vxe-column>
      </vxe-table>
    </template>
  </vxe-modal>
</template>
<script>
// 单选： 点击列表弹窗关闭 传递数据
// 多选： 点击选中， 点击确认传递数据。

export default {
  name: "CellUserDialog",
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    model: {
      type: String,
    },
  },
  data() {
    return {
      tableData: [],
    };
  },
  computed: {
    isRadio() {
      return this.model === "radio";
    },
  },
  created() {},
  methods: {
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
     *
     * @param {*} row
     * @description 单选时设置值。
     */
    setRadioValue(row) {
      this.selected = [row];
      this.closeDialog();
    },
    closeDialog() {
      this.$emit("update:visible", false);
    },
  },
};
</script>
<style scoped lang="scss"></style>
