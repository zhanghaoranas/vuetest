import { ref } from "@vue/composition-api";
// 可以同API 相关联
function useArticleList() {
  const articleList = ref([]);
  async function getList(page) {
    const data = await [22, 11, 43];
    articleList.value = data;
  }
  return {
    articleList,
    getList,
  };
}

export default useArticleList;
