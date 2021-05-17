<template>
  <div>
    <RuleForm :form="form"></RuleForm>
  </div>
</template>

<script>
import RuleForm from '../components/RuleForm';
export default {
  name: 'portHasRule',
  components: {
    RuleForm,
  },
  data() {
    return {
      form: {
        name: '',
        sex: '',
      },
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped lang='scss'>
</style>