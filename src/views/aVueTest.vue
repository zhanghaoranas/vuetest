<template>
  <div>
    <avue-crud
      class="avue-crud"
      :data="data"
      :search.sync="form"
      :option="option"
      :page.sync="page"
      @on-load="onLoad"
      v-enter
      @search-change="searchChange"
    >
      <template #surnameSearch>
        <KeySelect :list="dicData" />
      </template>
      <template #areaIDSearch>
        <AreaSearchByHove ref="searchHove" v-model="form.areaID" @response="setAreaId" />
      </template>
    </avue-crud>
    {{ form }}
  </div>
</template>


<script>
import enter from '../directive/enter.js';
import AreaSearchByHove from '../components/search/AreaSearchByHove.vue';
import KeySelect from '../components/KeySelect.vue';
export default {
  components: {
    AreaSearchByHove,
    KeySelect,
  },
  directives: {
    enter,
  },
  data() {
    return {
      page: {
        pageSize: 20,
        pagerCount: 5,
      },
      data: [],
      form: {
        surname: '',
      },
      option: {
        align: 'center',
        menuAlign: 'center',
        searchLabelWidth: 100,
        // enter: true,
        column: [
          {
            label: '姓名',
            prop: 'name',
            search: true,
          },
          {
            label: '姓氏',
            prop: 'surname',
            type: 'select',
            search: true,
            searchslot: true,
          },
          {
            label: '所属区域',
            prop: 'areaName',
            search: true,
            type: 'select',
            dicData: [
              {
                label: '1',
                value: '1',
              },
              {
                label: '2',
                value: 2,
              },
              {
                label: '1',
                value: '1',
              },
              {
                label: '2',
                value: 2,
              },
              {
                label: '1',
                value: '1',
              },
              {
                label: '2',
                value: 2,
              },
              {
                label: '1',
                value: '1',
              },
              {
                label: '2',
                value: 2,
              },
            ],
            // searchslot: true,
          },
          {
            label: '所属区域ID',
            prop: 'areaID',
            search: true,
            searchslot: true,
          },
        ],
      },
      dicData: [],
    };
  },
  computed: {
    selected() {
      if (this.form.surname) {
        return this.form.surname
          .map((value) => {
            return this.dicData.find((item) => item.value === value).label;
          })
          .join();
      } else {
        return '';
      }
    },
  },
  created() {
    for (let i = 0; i < 20; i++) {
      this.dicData.push({
        label: `姓名${i}`,
        value: i,
      });
    }
  },
  methods: {
    onLoad() {
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
    searchChange(form, done) {
      setTimeout(() => {
        done();
      }, 1000);
    },
    setAreaId(data) {
      this.form.areaID = data.map((item) => item.areaId).join();
      this.$refs.searchHove.handleFocus();
    },
  },
};
</script>
<style lang="scss">
.serach-tran {
  display: flex;
  flex-wrap: wrap;
}
// .avue-form__row:focus-within {
//   border: 1px solid red;
// }
</style>

  