<template>
  <div class="mark">
    <div class="edit">
      <h5>user</h5>
      <div class="editinput" v-if="postData">
        <div class="textdata">
          <span>文章标题</span>
          <input type="text" v-model="postData.title" />
        </div>
        <div class="textdata">
          <span>文章内容</span>
          <input type="text" v-model="postData.content" />
        </div>

        <div class="textdata">
          <span>文章的浏览量</span>
          <input type="text" v-model="postData.pv" />
        </div>
      </div>
      <div class="button">
        <span @click="hide">取消</span>
        <span @click="save">保存</span>
      </div>
    </div>
  </div>
</template>

<script>
import { baseUrl } from "../../../config/service";
// eslint-disable-next-line no-unused-vars
import Notice from "../FuncComponent/Notice";
export default {
  mounted() {
    // this.usericon = baseUrl + "/avatar/" + this.postData.avatar;
    console.log(this.postData);
    console.log(baseUrl);
  },
  data() {
    return {};
  },
  methods: {
    hide() {
      this.remove();
    },
    save() {
      let token = localStorage.getItem("token");
      fetch(baseUrl + "/root/post/edit", {
        mode: "cors",
        credentials: "same-origin",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          postId: this.postData._id,
          title: this.postData.title,
          content: this.postData.content,
          pv: this.postData.pv
        })
      }).then(result => {
          result.json().then(value => {
              console.log(value)
              let notice = this.$create(Notice,{
                  message: value.message,
                  duration: 2000
              })
              notice.show()
              this.remove()
          })
      })
    }
  },
  props: ["postData"]
};
</script>

<style lang="scss" scoped>
.mark {
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(#000000, 0.3);
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .edit {
    width: 800px;
    height: 550px;

    background-color: white;
    border-radius: 10px;
    position: relative;
    h5 {
      text-align: center;
      line-height: 30px;
      border-bottom: 1px solid #f7f7f7;
    }
    .editinput {
      width: 100%;
      height: 350px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      .textdata {
        width: 520px;
        height: 30px;
        display: flex;
        justify-content: space-between;
        input {
          width: 400px;
          height: 30px;
          padding: 0;
          border: 1px solid #cccccc;
          text-indent: 1rem;
        }
        span {
          line-height: 30px;
        }
      }
      .upicon {
        margin: 0 auto;
        display: flex;
        width: 400px;
        justify-content: space-between;
        img {
          border-radius: 5px;
        }
        .oldicon {
          width: 100px;
          height: 100px;
          background-color: pink;
        }
        .newicon {
          width: 100px;
          height: 100px;
          background-color: pink;
          label {
            width: 100px;
            height: 100px;
            display: flex;
            padding: 0;
            margin: 0;
          }
        }
      }
    }
    .remove {
      position: absolute;
      cursor: pointer;
      right: 30px;
    }
    .button {
      display: flex;
      justify-content: space-around;
      margin-top: 45px;
      span {
        font-size: 12px;
        padding: 0 10px;
        cursor: pointer;
        height: 25px;
        border: 1px solid #dcdfe6;
        border-radius: 3px;
        line-height: 25px;
        &:hover {
          color: #4165d7;
          border-color: #c6d1f3;
          background-color: #ecf0fb;
        }
      }
    }
  }
}
</style>