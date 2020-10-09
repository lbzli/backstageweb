<template>
  <div class="user">
    <div class="user_info" v-if="user">
      <img :src="user.icon"/>
    <span class="user_name">{{user.userName}}</span>
    </div>
    <div class="user_login" v-else>
      <router-link to="/login" tag="span">登录</router-link>
    </div>
    <div class="user_menu" v-if="user">
      
      <div class="menu_item" @click="lognout">退出登录</div>
    </div>
  </div>
</template>

<script>
import Notice from '../../components/Common/FuncComponent/Notice'
export default {
  data() {
    return {
      
    };
  },
  props: ["user"],
  methods: {
    lognout() {
      const notice = this.$create(Notice, {
        message: "登出成功",
        duration: 2000
      });
      notice.show();

      // localStorage.setItem("loginStatus", false);
      localStorage.removeItem("root");
      // this.$store.commit("loginStatus", { login: false });

      // this.$store.commit("clearUserInfo", {});
      // localStorage.removeItem("user");
      console.log("你点击了退出")
      this.$router.push('/')
    },

  }
};
</script>

<style lang="scss" scoped>
.user {
  max-width: 100px;

  .user_login {
    width: 100%;
    display: flex;
    height: 50px;
    justify-content: space-around;
    align-items: center;
    * {
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
    }
  }
  .user_info {
    display: flex;
    height: 50px;
    justify-content: space-around;
    align-items: center;
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      cursor: pointer;
    }
    .user_name {
      font-size: 16px;
      font-weight: 700;
    }
  }
  .user_menu {
    height: 0px;
    transition: all 1s ease;
    overflow: hidden;
    font-size: 14px;
    .menu_item {
      background-color: #330033;
      box-shadow: 1px 1px 3px white;
      padding: 0 10px;
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      text-align: center;
      margin-top: 10px;
      font-size: 14px;
      font-weight: 600;
    }
  }
  &:hover {
    .user_menu {
      height: 180px;
    }
  }
}
</style>