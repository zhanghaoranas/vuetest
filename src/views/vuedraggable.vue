<template>
  <div>
    <draggable v-model="myArray">
      <div v-for="element in myArray" :key="element.id">{{ element.name }}</div>
    </draggable>
    {{ myArray }}
  </div>
</template>
<script>
import draggable from 'vuedraggable';
export default {
  name: '',
  components: {
    draggable,
  },
  data() {
    return {
      myArray: [
        {
          id: 1,
          name: '小米',
        },
        {
          id: 2,
          name: '荣耀',
        },
        {
          id: 3,
          name: '苹果',
        },
        {
          id: 4,
          name: '华为',
        },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>
<style scoped lang="scss"></style>
