<template>
    <div>
        <img v-bind:src="i" alt="">
        <button @click="add">下一张</button>
        <button @click="dis">上一张</button>
    </div>
</template>
<script>
export default {
  name: "img",
  data() {
    return {
      num: 10
    };
  },
  computed: {
    i() {
      return `https://yangzj1992-1251901721.cos.ap-beijing.myqcloud.com/images/TKL/wall-${
        this.num
      }.jpg`;
    }
  },
  methods: {
    add() {
      this.num += 1;
    },
    dis() {
      this.num = this.num - 1;
    }
  }
};
</script>

<style scoped>
div {
  width: 900px;
  height: auto;
}
img {
  width: 500px;
  height: auto;
  display: inline-block;
}
button {
  float: right;
  width: 100px;
  height: 60px;
}
</style>
