<template>
  <div>
    <el-button @click="handleChangeSync">点击更改父组件的元素</el-button>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    visible: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    handleChangeSync() {
      this.$emit('update:visible', false);
    },
  },
};
</script>
<style scoped lang='scss'>
</style>