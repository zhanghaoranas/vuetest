<template>
  <div>
    {{ a }}
  </div>
</template>
<script>
// 一个setup当中可以有多出响应变量的声明，而且他们应当是与逻辑紧密结合的.
// 在setup当中执行时返回有效对象不能被阻塞
// 外部没有其他依赖，只是交付渲染的响应变量 对于这种情况，可以通过声明、对外暴露响应变量，在hook中异步修改的方式
import { ref, reactive, toRefs } from '@vue/composition-api';
export default {
  name: 'CompositionAPI',
  setup() {
    const a = ref({
      value: 'aaa',
    });
    const b = reactive({
      value: 'bbb',
    });
    a.value = 'ccc';
    console.log(a.value, b.value);
    const page = reactive({
      currentPage: 1,
      pageSizes: [5, 10, 20],
      pageSize: 5,
      total: 0,
    });

    function handleSizeChange(val) {
      page.pageSize = val;
      getList();
    }
    function handleCurrentChange(val) {
      page.currentPage = val;
      getList();
    }

    const articleList = ref([]);
    async function getList() {
      const data = await [1, 2, 3];
      articleList.value = data;
    }
    getList();
    return {
      ...toRefs(page),
      handleSizeChange,
      handleCurrentChange,
      getList,
      articleList,
      a,
      b,
    };
  },
};
</script>
<style scoped lang='scss'></style>