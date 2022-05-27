<template>
  <div>
    <BindComponentVue v-bind="test"></BindComponentVue>
  </div>
</template>
<script>
import BindComponentVue from "@/components/BindComponent.vue";
export default {
  name: "VBind",
  components: {
    BindComponentVue,
  },
  data() {
    return {
      test: {
        value: 111,
      },
    };
  },
  created() {},
  methods: {},
};
</script>
<style scoped lang="scss"></style>
