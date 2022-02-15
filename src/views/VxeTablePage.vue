<template>
  <div>
    <vxe-pager
      align="left"
      :current-page.sync="page1.currentPage"
      :page-size.sync="page1.pageSize"
      :layouts="['PrevJump', 'PrevPage', 'NextPage', 'Sizes', 'FullJump']"
    >
    </vxe-pager>
  </div>
</template>
<script>
export default {
  name: "VxtTablePage",
  data() {
    return {
      page1: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 200,
      },
    };
  },
  created() {
    console.log(111111111);
  },
  methods: {},
};
</script>
<style scoped lang="scss"></style>
