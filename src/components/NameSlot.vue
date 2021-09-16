<template>
  <div class="hello">
    <slot name="test">asdfasdfadfasdf</slot>
    <slot>11111111111</slot>
  </div>
</template>

<script>
export default {
  name: 'NameSlot',
  props: {
    formData: Object,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>