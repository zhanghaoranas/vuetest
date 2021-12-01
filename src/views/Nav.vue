<template>
  <div>
    <ul>
      <li v-for="(item, index) in paths" @click="routeTo(item)" :key="index">
        {{ item.name || item.path }}
      </li>
    </ul>
  </div>
</template>
<script>
import routes from '../router/routes.js';
const paths = routes.filter((item) => item.path !== '/').map((item) => ({ path: item.path, name: item.name }));
export default {
  name: 'NavHome',
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
  },
};
</script>
<style scoped lang='scss'></style>