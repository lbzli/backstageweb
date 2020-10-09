<template>
  <div class="tree">
    <div class="menu_item">
      <router-link tag="div" class="title" :to="model.target">
        <span class="iconfont icon-phone"></span>
        <span class="tolink">{{model.title}}</span>
      </router-link>
      <div class="list" @click="show">
        <span class="iconfont icon-xiala" v-if="model.children.length != 0"></span>
      </div>
    </div>

    <transition name="treeshow">
      <div v-if="model" v-show="isshow">
        <tree v-for="item in model.children" :model="item" :key="item.title"></tree>
      </div>
    </transition>
  </div>
</template>


<script>
export default {
  name: "Tree",
  data() {
    return {
      isshow: false
    };
  },
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  computed: {},
  methods: {
    show() {
      this.isshow = !this.isshow;
    }
  }
};
</script>

<style lang="scss" scoped>
.tree {
  padding-left: 10px;
  transition: all 0.2 ease;
  .icon-xiala {
    font-size: 12px;
    margin: auto 0;
    margin-right: 15px;
  }
  .menu_item {
    width: 100%;
    height: 50px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.2s ease;
    .title {
      width: 100px;
      display: flex;
      justify-content: space-around;
      span {
        padding: 6px 0;
      }
      span:nth-of-type(1) {
        font-size: 20px;
      }
      span:nth-of-type(2) {
        font-size: 12px;
        margin-top: 5px;
      }
    }
    &:hover {
      font-size: 20px;
      color: blueviolet;
    }
  }
}

.treeshow-enter-active,
.treeshow-leave-active {
  transition: opacity 0.5s;
}
.treeshow-enter, .treeshow-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>