/* eslint-disable vue/no-unused-components */
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: "App",
  
  
  methods: {
    getFile(e) {
      console.log(e.target.files);
    }
  }
};
</script>

<style src="./css/iconfont.css"></style>
<style lang="scss">
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

</style>


