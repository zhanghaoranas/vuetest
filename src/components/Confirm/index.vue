<template>
  <el-dialog class="confirm-dialog" :visible.sync="visible" :top="top" :before-close="handleCancel">
    <template v-slot:title>
      <div class="slot-title"></div>
    </template>
    <div class="confirm-dialog__body">
      <div class="status-icon">
        <i :class="typeClass"></i>
      </div>
      <div>{{ message }}</div>
    </div>
    <template v-slot:footer>
      <div>
        <el-button ref="sureBtn" type="primary" size="mini" @click="handleSure" @keydown.enter="handleSure">确 定</el-button>
        <el-button size="mini" @click="handleCancel">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
// import { ref, reactive, toRefs, computed, watch, onMounted, nextTick } from "@vue/composition-api";
export default {
  name: "Inca-Confirm",
  // setup(initProps, setupContext) {
  //   const sureBtn = ref(null);
  //   const data = reactive({
  //     visible: true,
  //     top: "25vh",
  //     type: "info",
  //     message: "是否确认删除？",
  //     resolve: null,
  //     reject: null,
  //   });
  //   const typeClass = computed(() => {
  //     return `el-icon-${data.type} icon`;
  //   });
  //   onMounted(() => {
  //     nextTick(() => {
  //       console.log(sureBtn);
  //       sureBtn.value.$el.focus();
  //     });
  //   });
  //   watch(
  //     () => data.visible,
  //     (n) => {
  //       if (!n) {
  //         this.destroy();
  //       }
  //     }
  //   );

  //   function handleCancel() {
  //     data.visible = false;
  //     data.resolve();
  //   }
  //   function handleSure() {
  //     console.log()
  //     data.visible = false;
  //     data.resolve();
  //   }
  //   function destroy() {
  //     setupContext.$destroy();
  //   }
  //   return {
  //     ...toRefs(data),
  //     typeClass,
  //     sureBtn,
  //     handleCancel,
  //     handleSure,
  //     destroy,
  //   };
  // },
  data() {
    return {
      visible: true,
      top: "25vh",
      type: "info",
      message: "是否确认删除？",
      resolve: null,
      reject: null,
    };
  },
  computed: {
    typeClass() {
      return `el-icon-${this.type} icon`;
    },
  },
  mounted() {
    // 由于引用的是element的dialog 光标的聚焦不能直接运行， 需要在$nextTick中。
    this.$nextTick(() => {
      this.$refs.sureBtn.$el.focus();
    });
  },
  watch: {
    visible(n) {
      if (!n) {
        this.destroy();
      }
    },
  },
  methods: {
    beforeClose() {
      this.handleCancel();
    },
    handleSure() {
      this.visible = false;
      this.resolve();
    },
    handleCancel() {
      this.visible = false;
      this.reject();
    },
    destroy() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
  },
};
</script>
<style scoped lang="scss">
// 需要改写dialog组件的样式
.confirm-dialog ::v-deep {
  .el-dialog {
    display: inline-block;
    width: auto;
    min-width: 228px;
    max-width: 400px;
    left: 50%;
    transform: translateX(-50%);
  }
  .el-dialog__header {
    padding-top: 10px;
  }
  .el-dialog__headerbtn {
    top: 16px;
    right: 16px;
  }
  .el-dialog__body {
    padding: 0px 32px 10px 24px;
  }
  .el-dialog__footer {
    padding-right: 17px;
  }
}
.icon {
  font-size: 16px;
  margin-right: 8px;
}
.el-icon-success {
  color: rgba(7, 193, 96, 1);
}
.el-icon-info {
  color: rgba(65, 143, 247, 1);
}
.el-icon-warning {
  color: rgba(254, 160, 40, 1);
}
.el-icon-error {
  color: rgba(250, 81, 81, 1);
}
.confirm-dialog__body {
  display: flex;
  align-items: flex-start;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  line-height: 20px;
}
.status-icon {
  display: flex;
  align-items: center;
  height: 20px;
}
</style>
