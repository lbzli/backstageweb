<template>
  <div class="message" v-if="isShow">
      {{message}}
    </div>
</template>

<script>
export default {
    props:["title","message","duration"],
    data() {
        return {
            isShow: true
        }
    },
    methods: {
        show() {
            this.isShow = true
            setTimeout(this.hide, this.duration)
        },
        hide() {
            this.isShow = false
            this.remove()
        }
    },
}
</script>

<style lang="scss" scoped>
.message {
    max-width: 300px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    border-radius: 5px;
    background-color: pink;
    position: fixed;
    top: 175px;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 999;
}
</style>