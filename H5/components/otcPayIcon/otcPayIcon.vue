// Created by 任泽阳.
// otc支付方式
// *****************************
<template>
<span class="common-otcPayIcon a-2-bg"
  :class="className"
  @click="handClick">
  <img :src="imgUrl">
</span>
</template>
<script>
export default {
  name: 'c-h-otcPayIcon',
  props: {
    imgUrl: { type: String, default: '' },
    className: { type: String, default: '' },
  },
  methods: {
    handClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="stylus" scoped>
.common-otcPayIcon {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  display: inline-block;
  // margin-right: 10px;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
  img {
    width: 16px;
    height: 16px;
    margin: 2px;
    display: inline-block;
  }
}
</style>
