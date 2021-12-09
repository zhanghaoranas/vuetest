<template>
  <div class="test">
    <el-input ref="input" class="search-input" placeholder="请填入或选择" :value="name" @input="handleInput">
      <i slot="suffix" v-if="name" class="el-input__icon el-icon-circle-close" @click="handleClear"></i>
      <el-button class="focus-active" slot="append" icon="el-icon-search" @click="handleShowDialog"></el-button>
    </el-input>
    <AreaHove ref="area" title="请选择片区" :visible.sync="visible" :request="api" @deliver="setData" />
  </div>
</template>
<script>
import { getAreaList as api } from '../../api/index.js';
import AreaHove from '../hove/AreaHove.vue';
export default {
  name: 'AreaSearchByHove',
  model: {
    prop: 'name',
    event: 'input',
  },
  components: {
    AreaHove,
  },
  props: {
    name: {
      type: String,
    },
    selectType: {
      default: 'radio',
      type: String,
      validator: function (val) {
        return ['radio', 'select'].indexOf(val) !== -1;
      },
    },
  },
  data() {
    return {
      api,
      visible: false,
    };
  },
  methods: {
    handleShowDialog() {
      this.visible = true;
    },
    setData(row) {
      this.$emit('response', row);
    },
    handleInput(val) {
      this.$emit('input', val);
      this.$emit('change', val);
    },
    handleClear() {
      this.handleInput();
      this.setData();
    },
    handleFocus() {
      this.$refs.input.focus();
    },
  },
};
</script>
<style scoped lang='scss'>
.search-input ::v-deep .el-input-group__append:focus-within {
  border-color: #409eff !important;
  color: #409eff !important;
  border-left: 1px solid;
}
.search-input ::v-deep .focus-active:focus {
  border-left: none !important;
}
</style>