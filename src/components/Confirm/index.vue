<template>
  <el-dialog class="confirm-dialog" :visible="visible" :top="top">
    <template v-slot:title>
      <div class="slot-title"></div>
    </template>
    <div>
      内容啊手动阀手动阀手动阀
    </div>
    <template v-slot:footer>
      <div>
        <el-button type="primary" size="small">确 定</el-button>
        <el-button size="small">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
export default {
  name: "Inca-Confirm",
  data() {
    return {
      visible: true,
      top: "25vh",
    };
  },
  created() {},
  methods: {},
};
</script>
<style scoped lang="scss">
.confirm-dialog ::v-deep .el-dialog {
  display: inline-block;
  max-width: 400px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
