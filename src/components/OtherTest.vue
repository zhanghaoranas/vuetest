<template>
  <div>{{ testArr }}</div>
</template>

<script>
// function clreaVueArray(vueArray) {
//   vueArray.splice(0);
// }

export default {
  name: '',
  props: ['testArr'],
  data() {
    return {};
  },
  computed: {
    newTestArr() {
      return this.testArr;
    },
  },
  mounted() {
    // this.newTestArr = 3;
    console.log(this.newTestArr);
    // this.newTestArr.push(11);
    // setTimeout(() => {
    //   clreaVueArray(this.newTestArr);
    //   this.newTestArr.push(222);
    // }, 5000);
  },
  activated() {
    console.log(33333333);
  },
  methods: {},
};
</script>
<style scoped lang='scss'>
</style>