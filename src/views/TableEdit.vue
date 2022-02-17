<template>
  <vxe-grid ref="vxeGrid" v-bind="gridOptions" @keydown="keydown"> </vxe-grid>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      gridOptions: {
        border: true,
        resizable: true,
        showOverflow: true,
        height: 300,
        align: "left",

        columns: [
          { type: "checkbox", width: 50 },
          { type: "seq", width: 50 },
          {
            field: "name",
            title: "Name",
            editRender: {
              name: "$input",
            },
          },
          {
            field: "sex",
            title: "Sex",
            showHeaderOverflow: true,
            editRender: {
              name: "$select",
            },
          },
          { field: "address", title: "Address", showOverflow: true },
          {
            field: "nickname",
            title: "昵称",
            showOverflow: true,
            editRender: {
              name: "$input",
            },
          },
        ],
        data: [
          { id: 10001, name: "Test1", nickname: "T1", role: "Develop", sex: "Man", age: 0, address: "Shenzhen" },
          { id: 10002, name: "Test2", nickname: "T2", role: "Test", sex: "Women", age: 22, address: "Guangzhou" },
          { id: 10003, name: "Test3", nickname: "T3", role: "PM", sex: "Man", age: 100, address: "Shanghai" },
          { id: 10004, name: "Test4", nickname: "T4", role: "Designer", sex: "Women", age: 70, address: "Shenzhen" },
          { id: 10005, name: "Test5", nickname: "T5", role: "Develop", sex: "Women", age: 10, address: "Shanghai" },
          { id: 10006, name: "Test6", nickname: "T6", role: "Designer", sex: "Women", age: 90, address: "Shenzhen" },
          { id: 10007, name: "Test7", nickname: "T7", role: "Test", sex: "Man", age: 5, address: "Shenzhen" },
          { id: 10008, name: "Test8", nickname: "T8", role: "Develop", sex: "Man", age: 80, address: "Shenzhen" },
        ],
        mouseConfig: {
          selected: true,
        },
        editConfig: {
          trigger: "click",
          mode: "cell",
          showStatus: true,
        },
        rowConfig: {
          isCurrent: true, // hover 不进行高亮。
        },
        keyboardConfig: {
          isArrow: true, // 开启方向键功能
          isEdit: true, // 开启任意键进入编辑（功能键除外）
        },
      },
    };
  },

  created() {},
  methods: {
    keydown({ $event }) {
      console.log($event);
      const { code } = $event;
      $event.stopPropagation();
      const vxeGrid = this.$refs.vxeGrid;
      console.log(code);
      switch (code) {
        case "ArrowRight":
          this.setActiveCellOnRow(vxeGrid, true);
          break;
        case "ArrowLeft":
          this.setActiveCellOnRow(vxeGrid, false);
          break;
        case "ArrowDown":
          this.setActiveCellOnColumn(vxeGrid, true);
          break;
        case "ArrowUp":
          this.setActiveCellOnColumn(vxeGrid, false);
          break;
        case "Tab":
          this.tableActiveNext(vxeGrid);
          break;
      }
    },
    setActiveCellOnRow(vxeGrid, arrow) {
      const { row, rowIndex, columnIndex } = vxeGrid.getActiveRecord();
      const willActiveColumn = this.getNextEditCellOnRow(columnIndex, arrow);
      console.log(willActiveColumn);
      if (willActiveColumn) {
        vxeGrid.setActiveCell(row, willActiveColumn);
      } else {
        // 激活下一行
        const nextRow = this.gridOptions.data[rowIndex + 1];
        // 存在下一行则激活下一行第一个可以编辑的单元格。
        if (nextRow) {
          vxeGrid.setActiveRow(nextRow);
          vxeGrid.setCurrentRow(nextRow); // 高亮
        } else {
          console.log("是否生成新的一行");
        }
      }
    },
    /**
     * @description 递归获取下一个可编辑的单元格
     * @param {*} columnIndex
     */
    getNextEditCellOnRow(columnIndex, arrow = true) {
      const vxeGrid = this.$refs.vxeGrid;
      const columns = vxeGrid.getColumns();
      const step = arrow ? 1 : -1;
      const column = columns[columnIndex + step];
      if (!column) {
        return false;
      } else {
        if (column.editRender) {
          return column;
        } else {
          return this.getNextEditCellOnRow(columnIndex + step);
        }
      }
    },
  },
};
</script>
<style scoped lang="scss"></style>
