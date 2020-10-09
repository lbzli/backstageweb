<template>
  <div class="table">
    <div class="delete_select">
      <span @click="deleteSelect">删除选中的用户</span>
    </div>
    <table border="1" cellspacing="0">
      <tr class="none">
        <th class="half">
          <input type="checkbox" value="-1" v-model="allcheck" @change="allchecked($event)" />
        </th>
        <th class>名字</th>
        <th class>性别</th>
        <th class>用户头像</th>
        <th class>用户权限</th>
        <th class>操作</th>
      </tr>
      <tr v-for="(userItem,index) in userData" :key="index">
        <td class="half">
          <input type="checkbox" :value="userItem.name" id v-model="checkedNames" check />
        </td>
        <td>{{userItem.name}}</td>
        <td>{{userItem.gender}}</td>
        <td>{{userItem.avatar}}</td>
        <td>{{userItem.authority}}</td>
        <td>
          <span @click="edit(userItem)">编辑</span>
          <span @click="remove(userItem.name)">删除</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Edit from "../Common/FuncComponent/UserEdit";
import Warring from "../Common/FuncComponent/Warring";
import { baseUrl } from "../../config/service";
export default {
  mounted() {
    let token = window.localStorage.getItem("token");
    fetch(baseUrl + "/root", {
      mode: "cors",
      credentials: "same-origin",
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token
      }
    }).then(result => {
      result.json().then(value => {
        this.userData = value
        console.log(value);
      });
    });
  },
  data() {
    return {
      userData: null,
      allcheck: false,
      checkedNames: []
    };
  },
  // props: ['title','tableData']
  methods: {
    allchecked(e) {
      if (e.target.checked) {
        for (const useritem of this.userData) {
          this.checkedNames.push(useritem.name);
        }
        // this.checkedNames.push(1, 2);
      } else {
        this.checkedNames = [];
      }
    },
    edit(userdata) {
      console.log("你正在点击编辑");
      this.$create(Edit, { userdata });
    },
    remove(data) {
      this.$create(Warring, { name: [data] });
    },
    deleteSelect() {
      if (this.checkedNames.length) {
        this.$create(Warring, { name: this.checkedNames });
      }
    }
  },
  watch: {
    checkedNames() {
      if (this.checkedNames.length === this.userData.length) {
        this.allcheck = true;
      } else {
        this.allcheck = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.delete_select {
  text-align: right;
  line-height: 45px;
  margin: 10px 0;
  span {
    margin-right: 20px;

    color: #000;
    cursor: pointer;
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    &:hover {
      background-color: #4165d7;
      color: white;
    }
  }
}
.table {
  table {
    width: 100%;
    font-size: 12px;
    overflow: hidden;
    border: 0.25px solid #ebeef5;

    color: #606266;
    tr {
      display: flex;
      &:nth-of-type(1) {
        background-color: #ebeef5;
      }
      &:nth-last-of-type(1) {
        td {
          border-bottom: 1px solid #cccccc;
        }
      }
      td {
        &:nth-last-of-type(1) {
          border-right: 1px solid #cccccc;
        }
      }
      th {
        &:nth-last-of-type(1) {
          border-right: 1px solid #cccccc;
        }
      }
    }

    th,
    td {
      flex: 1;
      line-height: 40px;
      border-right: none;
      border-bottom: none;
      padding: 0;
      overflow: hidden;
    }
    td {
      text-align: center;

      span {
        margin: 0 10px;
        cursor: pointer;
        color: blue;
      }
    }
    .half {
      flex: 0.4;
      input {
        margin: auto 0;
      }
    }
    .flex1 {
      flex: 1;
    }
    .flex2 {
      flex: 2;
    }
    .flex3 {
      flex: 3;
    }
    .flex4 {
      flex: 4;
    }
    .flex5 {
      flex: 5;
    }
  }
}
</style>