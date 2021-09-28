export default {
  updated: function(el, binding) {
    const { oldValue, value, arg } = binding;
    value[arg] = "update";
    console.log(value, this.updated);
    if (oldValue[arg] !== value[arg]) {
      console.log(1111111);
      value.flag = "update";
    } else {
      value.flag = false;
    }
  },
};
