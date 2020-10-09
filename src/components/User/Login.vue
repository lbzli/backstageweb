<template>
  <div class="box">
    <myForm :userIcon="userIcon">
      <FormItem label="用户名">
        <myInput v-model="username" placeholder="请输入用户名" autocomplete="off"></myInput>
      </FormItem>
      <FormItem label="密码">
        <myInput v-model="password" type="password" placeholder="请输入密码" @focus="getIcon"></myInput>
      </FormItem>
      <FormItem>
        <button @click.prevent="login">提交</button>
      </FormItem>
    </myForm>
  </div>
</template>

<script>
import myForm from "../Common/From/Form";
import FormItem from "../Common/From/FormItem";
import myInput from "../Common/From/Input";
import { baseUrl } from "../../config/service";
import Notice from "../Common/FuncComponent/Notice";
export default {
  components: {
    myForm,
    FormItem,
    myInput
  },
  data() {
    return {
      username: "",
      password: "",
      userIcon: ""
    };
  },
  methods: {
    login() {
      console.log(baseUrl);
      fetch(baseUrl + "/signin", {
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json"
        },
        body: JSON.stringify({
          name: this.username,
          password: this.password
        })
      })
        .then(result => {
          result.json().then(value => {
            console.log(value)
            if (value.status === 200) {
              console.log(value);
              let notice = this.$create(Notice, {
                message: value.message,
                duration: 2000
              });
              notice.show();
              this.$router.push("/root");
              //{userName:value.user.name, id:value.user._id,icon:baseUrl+'/login/'+value.user.avatar}
              localStorage.setItem("token", value.token);
              console.log({
                userName: value.user.name,
                id: value.user._id,
                icon: baseUrl + "/avatar/login" + value.user.avatar
              });
              localStorage.setItem(
                "root",
                JSON.stringify({
                  userName: value.user.name,
                  id: value.user._id,
                  icon: baseUrl + "/avatar/" + value.user.avatar
                })
              );
            }
          });
        })
        .catch(err => {
          console.log(err);
        });

      // let token = window.localStorage.getItem("token");
      // if (token) {
      //   requestConfig.headers.Authorization = "Bearer " + token;
      // }
    },
    getIcon() {
      // console.log('这里开始获取用户的头像')
      this.userIcon = this.username;
      console.log("这里开始获取用户头像");
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  background-color: #2f3447;
  border-top: 1px solid transparent;
}
button {
  width: 100px;
  height: 35px;
  display: block;
  background-color: white;
  margin: 40px auto 0;
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
  margin-bottom: 30px;
  font-size: 14px;
  border-radius: 30px;
  color: #000;
  &:hover {
    background-color: #c6d1f3;
  }
}
</style>