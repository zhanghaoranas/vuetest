<template>
  <el-tabs :value="activeName" @tab-click="handleClick">
    <el-tab-pane v-for="i in list" :key="i" :name="i">
      <span slot="label">
        <i class="el-icon-date"></i>
        我的行程{{ i }}
      </span>
      我的行程{{ i }}
    </el-tab-pane>
  </el-tabs>
</template>
<script>
/**
 * el-tab-pane 的name 的类型为string类型。
 *
 */
export default {
  data() {
    return {
      activeName: 'second',
      list: ['1', '2', '3'],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>