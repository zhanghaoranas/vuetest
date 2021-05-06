<template>
  <div>
    <el-dialog
      title="提示"
      :visible="dialogVisible"
      @open="dialogOpen"
      :before-close="beforeClose"
      :destroy-on-close="true"
    >
      <input v-model="a" type="text" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleShowControl(false)">取 消</el-button>
        <el-button type="primary" @click="handleShowControl(true)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <sync-test :visible.sync="dialogVisible"></sync-test> -->
  </div>
</template>

<script>
// import SyncTest from './SyncTest.vue';
export default {
  name: 'activity-item-show',
  components: {
    // SyncTest,
  },
  props: {
    dialogVisible: {
      type: Boolean,
      require: true,
    },
  },
  data() {
    return {
      a: '',
    };
  },
  mounted() {},
  methods: {
    handleShowControl(flag) {
      if (flag) {
        console.log('点击了确定');
      }
      this.$emit('update:dialogVisible', false);
    },
    dialogOpen() {
      console.log('open--------------');
    },
    // 不能连续使用.sync 修饰符，所以当dialog关闭时暴露的下面的接口，用于用户自己关闭。
    beforeClose() {
      console.log('will close--------------');
      this.$emit('update:dialogVisible', false);
    },
  },
};
</script>
<style scoped lang='scss'>
</style>
