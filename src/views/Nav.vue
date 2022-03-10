<template>
  <div>
    <ul>
      <li v-for="(item, index) in paths" @click="routeTo(item)" :key="index">
        {{ item.name || item.path }}
      </li>
    </ul>
    <button @click="handleClick">触发弹窗</button>
    <Confirm />
  </div>
</template>
<script>
import Confirm from "@/components/Confirm/index.vue";
import routes from "../router/routes.js";
const paths = routes.filter((item) => item.path !== "/").map((item) => ({ path: item.path, name: item.name }));
export default {
  name: "NavHome",
  components: {
    Confirm,
  },
  data() {
    return {
      paths,
    };
  },
  created() {},
  methods: {
    routeTo({ path }) {
      this.$router.push({
        path,
      });
    },
    handleClick() {
      this.$msg({
        type: "info",
        message: "出现Message触发弹窗触发弹窗触发弹窗触发弹窗出现",
      });
    },
  },
};
</script>
<style scoped lang="scss"></style>
