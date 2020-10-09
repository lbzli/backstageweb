<template>
  <div class="mark">
    <div class="edit">
      <h5>
        警告
        <!-- <span class="remove" @click="hide">点击删除</span> -->
      </h5>
      <div class="info" v-if="name">此操作将永久删除选中数据，是否继续</div>
      <div class="button">
        <span @click="deleteOne">确定</span>
        <span @click="hide">取消</span>
      </div>
    </div>
  </div>
</template>

<script>
import { baseUrl } from "../../../config/service";
export default {
  methods: {
    hide() {
      this.remove();
    },
    deleteOne() {
      let token = localStorage.getItem("token");
      for (const nameItem of this.name) {
        fetch(baseUrl + "/root/remove/" + nameItem, {
          mode: "cors",
          credentials: "same-origin",
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
          }
        }).then(result => {
          result.json().then(value => {
            console.log(value);
          });
        });
      }
      this.remove()
      location.reload()
    }
  },
  props: ["name"]
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
    width: 400px;
    height: 200px;

    background-color: white;
    border-radius: 10px;
    position: relative;
    h5 {
      text-align: center;
      line-height: 30px;
      border-bottom: 1px solid #f7f7f7;
    }
    .remove {
      position: absolute;
      cursor: pointer;
      right: 30px;
    }
    .info {
      text-align: center;
      margin-bottom: 25px;
      line-height: 50px;
    }
    .button {
      display: flex;
      justify-content: flex-end;
      span {
        margin-right: 20px;
        cursor: pointer;
        border: 1px solid #cccccc;
        padding: 5px 10px;
        font-size: 12px;
        border-radius: 5px;
        &:hover {
          background-color: #6784df;
        }
      }
    }
  }
}
</style>