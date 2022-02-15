<template>
  <section>
    <div>asdfa{{ value }}</div>
    <div>{{ testObj.arr }}</div>
  </section>
</template>
<script>
export default {
  name: "BindComponent",
  props: {
    value: {},
  },
  data() {
    return {
      testObj: {
        arr: [1, 2, 3],
      },
    };
  },
  computed: {
    show() {
      return this.testObj.arr;
    },
  },
  created() {
    console.log(this.value);
    console.log(this.$attrs);
    setTimeout(() => {
      this.testObj.arr = [3, 6, 9];
    }, 2000);
  },
  methods: {},
};
</script>
<style scoped lang="scss"></style>
