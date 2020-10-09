<template>
  <div class="mark">
    <div class="edit">
      <h5>user</h5>
      <div class="editinput" v-if="userdata">
        <div class="upicon">
          <div class="oldicon">
            <img :src="this.usericon" width="100px" alt />
          </div>
          <div class="newicon">
            <label for="file">
              <img
                src="https://cool-admin-pro.oss-cn-shanghai.aliyuncs.com/app/fb696fbc-f641-41a3-96f7-df75f6890827.png"
                width="100px"
                ref="newicon"
                alt
              />
              <input type="file" name id="file" v-show="false" @change="getFile($event)" />
            </label>
          </div>
        </div>
        <div class="textdata">
          <span>名字</span>
          <input type="text" v-model="newname" />
        </div>
        <div class="textdata">
          <span>性别</span>
          <input type="text" v-model="userdata.gender" />
        </div>

        <div class="textdata">
          <span>用户权限</span>
          <input type="text" v-model="userdata.authority" />
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
let formdata = new FormData();
import { baseUrl } from "../../../config/service";
// eslint-disable-next-line no-unused-vars
import Notice from "../FuncComponent/Notice";
export default {
  mounted() {
    this.usericon = baseUrl + "/avatar/" + this.userdata.avatar;
    console.log(this.userdata);
    console.log(baseUrl);
  },
  data() {
    return {
      newname: this.userdata.name,
      usericon: "",
      mark: false
    };
  },
  methods: {
    hide() {
      this.remove();
    },
    async save() {
      console.log("你点击了保存");
      let token = localStorage.getItem("token");
      await fetch(baseUrl + "/root/edit", {
        mode: "cors",
        credentials: "same-origin",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          username: this.userdata.name,
          newName: this.newname,
          gender: this.userdata.gender,
          authority: this.userdata.authority
        })
      }).then(result => {
        result.json().then(value => {
          console.log(value);
          let notice = this.$create(Notice, {
            message: value.message,
            duration: 2000
          });
          notice.show();
          if (value.status === 200) {
            //子组件的变化可以通过这种方式传回父组件？？？？？
            //会不会是因为传进来的是一个对象，然后这个组件
            this.userdata.name = this.newname;
          }
        });
      });

      if (this.mark) {
        let headers = { Accept: "application/json" };
        if (token) {
          headers.Authorization = "Bearer " + token;
        }
        formdata.append("rootedit_name", this.userdata._id);
        console.log(formdata)
        fetch("http://localhost:3000/avatar", {
          mode: "cors",
          credentials: "same-origin",
          method: "POST",
          headers,
          body: formdata
        }).then(result => {
          result.json().then(value => {
            console.log(value);
            console.log(baseUrl + value.filename);
            let notice = this.$create(Notice, {
              message: value.message,
              duration: 2000
            });
            this.userdata.avatar = value.filename
            notice.show();
            // localStorage.setItem("user", JSON.stringify(this.$store.state.user));
            // location.assign("/root/user");
            // this.remove();
          });
        });
      }
      this.remove();
      location.reload() 
    },
    getFile(e) {
      // console.log(e.target.files);
      let obj = e.target.files[0];
      // console.log(obj);
      let fr = new FileReader();
      let _this = this;
      //注册图片填充完成后的事件,会被填入一个文件的路径
      fr.onload = function() {
        _this.$refs.newicon.src = this.result;
      };
      fr.readAsDataURL(obj);

      formdata.append("myform", obj);
      // console.log(formdata);
      this.mark = true;
    },
    sub() {
      // let token = window.localStorage.getItem("token");
    }
  },
  props: ["userdata"]
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
        width: 495px;
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