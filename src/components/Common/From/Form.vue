<template>
  <div id="box">
    <div class="user_icon">
      <div class="icon">
         <img ref="iconimg" alt="">
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import {baseUrl} from '../../../config/service'
export default {
  data() {
    return {
      // eslint-disable-next-line no-undef
      // icon: baseUrl
    };
  },
  props: ["userIcon"],
  watch:{
    // eslint-disable-next-line no-unused-vars
    userIcon:function (newval) {
      console.log(newval)
      this.$refs.iconimg.src = baseUrl+'/avatar/login/'+newval
    }
  }
};
</script>

<style lang="scss" scoped>
#box {
  margin: 100px auto 0;
  width: 350px;
  min-width: 100px;
  .user_icon {
    display: flex;
    width: 70px;
    height: 70px;
    background-color: white;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;
    margin-bottom: 25px;
    margin-top: -30px;
    justify-content: center;
    align-items: center;
    img {
      height: 100%;
    }
    .icon {
      width: 50px;
      height: 50px;
      background-color: white;
      border-radius: 50%;
      overflow: hidden;
    }
  }
}
</style>