<template>
  <div>
    <el-form :model="form" :rules="rules">
      <el-form-item label="name" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ruleForm',
  props: {
    form: {
      type: Object,
    },
  },
  data() {
    return {
      rules: {
        name: [
          {
            required: true,
            message: '请输入活动名称',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped lang='scss'>
</style>