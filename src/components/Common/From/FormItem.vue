<template>
  <div class="item">
    <label v-if="label">{{label}}</label>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  min-height: 45px;
  margin: 10px 15px;
  > label {
    display: inline-block;
    margin: 10px 0;
    color: #2ea0b9;
  }
}
</style>