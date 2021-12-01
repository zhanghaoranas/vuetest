<template>
  <div
    class="select-warp"
    ref="keySelect"
    @keydown.stop="handlerKeyDown"
    tabindex="-1"
    @click.stop="dialogToggle"
    v-clickoutside="handleClose"
  >
    <div ref="selectMain" class="select-main">
      <div>
        <!-- el-tooltip组件 会有聚焦行为 -->
        <el-tooltip :disabled="!showValue" effect="dark" :tabindex="-1" :content="showValue" placement="top-start">
          <div class="select-main__value">{{ showValue || '所有' }}</div>
        </el-tooltip>
      </div>

      <i v-show="!showValue" class="el-icon-arrow-down"></i>
      <i v-show="showValue" class="el-icon-circle-close" @click.stop.self="clearValue"></i>
    </div>
    <transition name="el-zoom-in-top">
      <div
        ref="selectDialog"
        class="select-dialog"
        :style="dialogPosition"
        v-show="visible"
        @click.stop
        @keydown.enter="listKeyDownEnter"
        @keydown.esc="listKeyDownEnter"
      >
        <div class="select-dialog__search" v-if="canSearch">
          <el-input
            ref="searchInput"
            size="mini"
            class="select-dialog__input"
            autofocus
            type="text"
            @keydown.native.down.stop.prevent="lostFocus"
            v-model="filterValue"
          ></el-input>
        </div>
        <ul
          class="select-dialog__list"
          tabindex="-1"
          ref="dialogList"
          @keydown.down.stop.prevent="getNextFocus"
          @keydown.up.stop.prevent="getPreFocus"
        >
          <li v-for="(item, index) in filterList" :key="index" @click.prevent="selectValue(item)">
            <el-checkbox size="small" v-model="item.$checked"></el-checkbox>
            <span class="select-dialog__list-label">{{ item.label }}</span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
import Clickoutside from '@/directive/clickoutside.js';

export default {
  name: 'KeySelect',
  directives: { Clickoutside },
  components: {},
  props: {
    list: {
      type: Array,
      default: function () {
        return [];
      },
    },
    value: {
      type: Array,
      default: function () {
        return [];
      },
    },

    canSearch: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      rawData: [], // 生成的原始数据
      filterList: [], // 筛选过后的数据
      visible: false,
      filterValue: '',
      observer: null,
      dialogPosition: null,
      dialogList: {
        list: null,
        index: -1,
      },
    };
  },
  computed: {
    showValue() {
      const value = this.filterList.filter((item) => item.$checked).map((item) => item.label);
      this.$emit('input', value);
      return value.join(' | ');
    },
  },
  created() {
    this.filterList = this.rawData = this.list.map((item) => {
      return {
        ...item,
        $checked: false, // 内部数据， 添加$防止数据覆盖。
      };
    });
  },
  mounted() {
    const selectDialog = this.$refs.selectDialog;
    const selectMain = this.$refs.selectMain;
    // 由于外部存在overflow:hidden 所以将选项节点转移到body中。
    document.body.appendChild(selectDialog);

    this.setPosition(selectMain);
    const callback = () => {
      this.setPosition(selectMain);
    };
    window.addEventListener('resize', callback);
    this.$once('hook:beforeDestroy', function () {
      window.removeEventListener('resize', callback);
    });

    // document.addEventListener('keydown', function (event) {
    //   console.log(document.activeElement, 1111111);
    //   console.dir(event);
    // });
  },

  beforeDestroy() {
    // 销毁时 ，之前插入的选项似乎会自动销毁。
    // 取消元素的监听
  },
  watch: {
    filterValue(n) {
      if (n) {
        this.filterList = this.rawData.filter((item) => item.label.indexOf(n) > -1);
      } else {
        this.filterList = this.rawData;
      }
    },
    visible(n) {
      if (n) {
        // 当选项出现时检索框自动聚焦。
        setTimeout(() => {
          if (this.canSearch) {
            this.$refs.searchInput.focus();
          } else {
            this.lostFocus();
          }
        }, 200);
      }
    },
    'dialogList.index': function (n) {
      const { list } = this.dialogList;
      list[n].focus();
    },
  },
  methods: {
    /**
     * 展示下拉列表
     */
    handlerKeyDown(event) {
      if (event.key === 'ArrowDown') {
        this.visible = true;
      }
    },
    dialogToggle() {
      this.visible = !this.visible;
    },
    handleClose() {
      this.visible = false;
    },
    setPosition(el) {
      const getBoundingClientRect = el.getBoundingClientRect();
      const { top, left } = getBoundingClientRect;
      this.dialogPosition = {
        top: top + 32 + 'px',
        left: left - 4 + 'px',
      };
    },
    selectValue(item) {
      item.$checked = !item.$checked;
    },
    clearValue() {
      this.rawData.forEach((item) => (item.$checked = false));
      this.handleClose();
    },
    listKeyDownEnter() {
      this.handleClose();
      this.$refs.keySelect.focus();
    },
    // input 触发 keydown.down 时 列表中的input 拒绝。
    lostFocus() {
      const dialogList = this.$refs.dialogList.querySelectorAll('input');
      this.dialogList = {
        list: Array.from(dialogList),
        index: 0,
      };
    },

    getNextFocus() {
      this.dialogList.index = this.dialogList.index + 1;
      if (this.dialogList.index === this.dialogList.list.length) {
        this.dialogList.index = 0;
      }
    },
    getPreFocus() {
      if (this.dialogList.index === 0) {
        this.dialogList.index = this.dialogList.list.length - 1;
      } else {
        this.dialogList.index = this.dialogList.index - 1;
      }
    },
  },
};
</script>
<style scoped lang='scss'>
.select-warp {
  position: relative;
  z-index: 22;
  height: 32px;
  padding: 4px 8px;
  box-sizing: border-box;
  font-size: inherit;
  color: #606266;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  min-width: 200px;
  max-width: 400px;
  color: #666;
  &:hover {
    border-color: #409eff;
  }
  &:focus-within {
    border-color: #409eff;
  }
}
.select-main {
  display: flex;
  align-items: center;
  height: 100%;

  > div {
    flex: 1;
    width: calc(100% - 20px);
  }
}
.select-main__value {
  line-height: 1;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #666;
}
.select-dialog {
  position: absolute;
  background: #fff;
  padding: 4px;
  z-index: 99;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.select-dialog__list {
  list-style: none;
  padding: 0;
  margin: 8px 0 4px;
  height: 200px;
  overflow: auto;
  min-width: 300px;
  > li {
    display: flex;
    align-items: center;
    padding: 4px 0.5em;
    font-size: 14px;
    color: #666;
    &:focus-within {
      background-color: rgba(0, 0, 0, 0.04);
      color: #409eff;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
      color: #409eff;
    }
  }
}
.select-dialog__list-label {
  display: inline-block;
  margin-left: 0.5em;
}

.select-dialog__list::-webkit-scrollbar {
  width: 6px;
  height: 1px;
}
.select-dialog__list::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background-color: rgba(0, 0, 0, 0);
}
.select-dialog__list::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: #ededed;
}

// element 的过渡动画
.el-zoom-in-top-enter-active,
.el-zoom-in-top-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transform-origin: center top;
}
.el-zoom-in-top-enter,
.el-zoom-in-top-leave-active {
  opacity: 0;
  transform: scaleY(0);
}
</style>
<style>
</style>