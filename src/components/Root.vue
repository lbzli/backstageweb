<template>
  <div class="root">
    <div class="page-layout">
      <div class="page-layout_left">
        <div class="app-slider">
          <div class="logo">管理系统</div>
          <div class="menu">
            <tree :model="mytreedata"></tree>
          </div>
        </div>
      </div>
      <div class="page-layout_right">
        <div class="page-layout_topbar">
          <rootuser class="rootuser" :user='user'></rootuser>
        </div>
        <div class="page-layout-process"></div>
        <router-view class="page-layout_container" name="rootitem"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import tree from "./Tree";
import rootuser from "./User/RootUser";
export default {
  mounted() {
    this.user = JSON.parse(localStorage.getItem('root'))
  },
  data() {
    return {
      user:{},
      mytreedata: {
        title: "数据管理",
        children: [
          {
            title: "用户信息管理",
            children: [
              
            ],
            target: '/root/user'
          },
          {
            title: "文章数据管理",
            children: [
             
            ],
            target: '/root/post'
          }
        ],
        target: '/root'
      }
    };
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    tree,
    rootuser
  }
};
</script>

<style lang="scss" scoped>
.root {
  width: 100wh;
  height: 100vh;
  overflow: hidden;

  .page-layout {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;

    .page-layout_left {
      width: 222px;
      height: 100%;
      overflow: hidden;
      background-color: #2f3447;
      display: flex;
      .app-slider {
        display: flex;
        width: 222px;
        height: 100%;
        flex-direction: column;
        .logo {
          width: 222px;
          height: 80px;
          color: white;
          text-align: center;
          line-height: 80px;
          font-family: "webfont";
        }
      }
    }
    .page-layout_right {
      width: calc(100% - 222px);
      height: 100%;
      background-color: aqua;
      .page-layout_topbar {
        width: 100%;
        height: 50px;
        background-color: white;

        .rootuser {
          margin-left: 90%;
          margin-top: 0;
        }
      }
      .page-layout-process {
        width: 100%;
        height: 30px;
        background-color: pink;
      }
      .page-layout_container {
        width: 100%;
        height: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        background-color: white;
        border-top: 1px solid transparent;
      }
      .myicon-set {
        font-size: 18px;
      }
    }
  }
}
</style>