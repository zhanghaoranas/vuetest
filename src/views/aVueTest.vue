<template>
  <div>
    {{ page }}
    <avue-crud :data="data" :option="option" :page.sync="page" @on-load="onLoad"></avue-crud>
  </div>
</template>


<script>
export default {
  data() {
    return {
      page: {
        pageSize: 20,
        pagerCount: 5,
      },
      data: [],
      option: {
        align: 'center',
        menuAlign: 'center',
        column: [
          {
            label: '姓名',
            prop: 'name',
          },
          {
            label: '性别',
            prop: 'sex',
          },
        ],
      },
    };
  },
  methods: {
    onLoad(page) {
      this.$message.success('分页信息:' + JSON.stringify(page));
      this.page.total = 40;
      //模拟分页
      if (this.page.currentPage === 1) {
        this.data = [
          {
            id: 1,
            name: '张三',
            sex: '男',
          },
          {
            id: 2,
            name: '李四',
            sex: '女',
          },
        ];
      } else if (this.page.currentPage == 2) {
        this.data = [
          {
            id: 3,
            name: '王五',
            sex: '女',
          },
          {
            id: 4,
            name: '赵六',
            sex: '女',
          },
        ];
      }
    },
  },
};
</script>

  