<template>
  <transition name="fade-in" @after-leave="handleAfterLeave">
    <div class="pos-message" :class="closeStatus" :style="{ zIndex }" v-show="visible">
      <i :class="typeClass"></i>
      <p class="pos-message__text">{{ message }}</p>
      <i v-if="canClose" class="el-icon-close pos-message__closeIcon" @click="close"></i>
    </div>
  </transition>
</template>
<script>
export default {
  name: "Inca-Message",
  data() {
    return {
      type: "",
      message: "",
      visible: true,
      canClose: false,
      zIndex: 1,
    };
  },
  computed: {
    typeClass() {
      return `el-icon-${this.type} icon`;
    },
    closeStatus() {
      if (this.canClose) {
        return `pos-message__${this.type} pos-message__close`;
      } else {
        return null;
      }
    },
  },
  created() {
    if (!this.canClose) {
      const timer = setTimeout(() => {
        this.close();
      }, 3000);
      this.$once("hook:beforeDestroy", () => {
        clearTimeout(timer);
      });
    }
  },
  methods: {
    close() {
      this.visible = false;
    },
    handleAfterLeave() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
  },
};
</script>
<style scoped lang="scss">
.pos-message {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  background: #ffffff;
  box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
}
.pos-message__close {
  border: 1px solid;
  padding: 9px 24px;
}
.pos-message__success {
  border-color: rgba(7, 193, 96, 1);
}
.pos-message__info {
  border-color: rgba(65, 143, 247, 1);
  background-color: rgba(238, 246, 255, 1);
}
.pos-message__warning {
  border-color: rgba(254, 160, 40, 1);
  background-color: rgba(255, 244, 227, 1);
}
.pos-message__error {
  border-color: rgba(250, 81, 81, 1);
}
.pos-message__text {
  margin: 0;
  padding-left: 7px;
  line-height: 22px;
  font-weight: 400;
  color: #333333;
  font-size: 14px;
  max-width: 50em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.icon {
  font-size: 16px;
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
.pos-message__closeIcon {
  margin-left: 30px;
  cursor: pointer;
}
// 过渡动画
.fade-in-enter-active,
.fade-in-leave-active {
  transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
}
.fade-in-enter,
.fade-in-leave-active {
  opacity: 0;
}
</style>
