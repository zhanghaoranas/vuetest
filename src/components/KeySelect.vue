<template>
  <div class="select-warp" tabindex="0" @keydown="handlerKeyDown">
    <el-dropdown>
      <div>
        <el-tooltip :disabled="!value" effect="dark" :content="value" placement="top-start">
          <div class="select-main__value">{{ value || '所有' }}</div>
        </el-tooltip>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
        <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
</el-dropdown>
      <i class="el-icon-arrow-down"></i>
    </div>
    <div class="select-dialog" v-show="visible">
      <div class="select-dialog__search">
        <i></i>
        <input class="select-dialog__input" type="text" v-model="filterValue" @change="handlerFilterList" />
      </div>
      <ul class="select-dialog__list">
        <li v-for="(item, index) in filterList" :key="index">
          <label>
            <input type="checkbox" :checked="item.$checked" />
            {{ item.label }}
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'KeySelect',
  props: {
    list: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      rawData: [], // 生成的原始数据
      filterList: [], // 筛选过后的数据
      visible: false,
      filterValue: '',
    };
  },
  computed: {
    value() {
      return this.filterList
        .filter((item) => item.$checked)
        .map((item) => item.label)
        .join(' | ');
    },
  },
  created() {
    console.log(this.list);
    this.filterList = this.rawData = this.list.map((item) => {
      return {
        ...item,
        $checked: false, // 内部数据， 添加$防止数据覆盖。
      };
    });
  },
  methods: {
    handlerFilterList(val) {
      if (val) {
        this.filterList = this.rawData.filter((item) => item.label.indexOf(val) > -1);
      } else {
        this.filterList = this.rawData;
      }
    },
    /**
     * 展示下拉列表
     */
    handlerKeyDown(event) {
      if (event.key === 'ArrowDown') {
        this.visible = true;
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
  line-height: 24px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  min-width: 200px;
  max-width: 400px;
  &:hover {
    border-color: #409eff;
  }
  &:focus {
    border-color: #409eff;
  }
  // &:focus-within {
  //   border-color: red;
  // }
}
.select-main__value {
}
.select-dialog {
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>