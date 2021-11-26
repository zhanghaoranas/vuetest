<script>
import BaseHove from './BaseHove.vue';
export default {
  name: 'AreaHove',
  mixins: [BaseHove],
  data() {
    return {
      tableOption: {
        column: [
          {
            label: '区域ID',
            prop: 'areaID',
            overHidden: true,
            search: true,
          },
          {
            label: '区域名称',
            prop: 'areaName',
            width: 160,
            search: true,
          },
        ],
      },
    };
  },
};
</script>

