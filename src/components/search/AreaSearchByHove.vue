<template>
  <div>
    <el-input ref="input" placeholder="请填入或选择" :value="name" @input="handleInput">
      <i slot="suffix" v-if="name" class="el-input__icon el-icon-circle-close" @click="handleClear"></i>
      <el-button slot="append" icon="el-icon-search" @click="handleShowDialog"></el-button>
    </el-input>
    <AreaHove ref="area" title="请选择片区" :visible.sync="visible" :request="api" @deliver="setData" />
    <!-- <GoodsHove ref="goods" :selectType="selectType" @goodsSubmit="setData" /> -->
  </div>
</template>
<script>
// import GoodsHove from './AreaSearchByHove'; // 商品
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
    // GoodsHove,
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
<style scoped lang='scss'></style>