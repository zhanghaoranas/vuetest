<template>
  <div>
    <ul>
      <li v-for="(item, index) in paths" @click="routeTo(item)" :key="index">
        {{ item.name || item.path }}
      </li>
    </ul>
    <button @click="handleClick">触发弹窗</button>
  </div>
</template>
<script>
import routes from "../router/routes.js";
const paths = routes.filter((item) => item.path !== "/").map((item) => ({ path: item.path, name: item.name }));
export default {
  name: "NavHome",
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
    async handleClick() {
      // this.$msg({
      //   type: "info",
      //   message: "出现Message触发弹窗触发弹窗触发弹窗触发弹窗出现",
      // });
      try {
        await this.$confirm({
          type: "error",
          message: "错误选择",
        });
        console.log("1");
      } catch (error) {
        console.log(0);
      }
    },
  },
};
</script>
<style scoped lang="scss"></style>
