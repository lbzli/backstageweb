<template>
  <div class="table">
    <div class="delete_select">
      <span @click="deleteSelect">删除选中的文章</span>
    </div>
    <table border="1" cellspacing="0">
      <tr class="none">
        <th class="half">
          <input type="checkbox" value="-1" v-model="allcheck" @change="allchecked($event)" />
        </th>
        <th class>标题</th>
        <th class>作者</th>
        <th class>文章内容</th>
        <th class>浏览次数</th>
        <th class>操作</th>
      </tr>
      <tr v-for="(postItem,index) in postData" :key="index">
        <td class="half">
          <input type="checkbox" :value="postItem._id" id v-model="checkedNames" check />
        </td>
        <td>{{postItem.title}}</td>
        <td>{{postItem.author}}</td>
        <td>{{postItem.content}}</td>
        <td>{{postItem.pv}}</td>
        <td>
          <span @click="edit(postItem)">编辑</span>
          <span @click="remove(postItem._id)">删除</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import PostEdit from "../Common/FuncComponent/PostEdit";
import DeletePost from "../Common/FuncComponent/DeletePost";
import { baseUrl } from "../../config/service";
export default {
  mounted() {
    let token = window.localStorage.getItem("token");
    fetch(baseUrl + "/root/post", {
      mode: "cors",
      credentials: "same-origin",
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token
      }
    }).then(result => {
      result.json().then(value => {
        this.postData = value
        console.log(value);
      });
    });
  },
  data() {
    return {
      postData: null,
      allcheck: false,
      checkedNames: []
    };
  },
  // props: ['title','tableData']
  methods: {
    allchecked(e) {
      if (e.target.checked) {
        for (const postItem of this.postData) {
          this.checkedNames.push(postItem._id);
        }
        // this.checkedNames.push(1, 2);
      } else {
        this.checkedNames = [];
      }
    },
    edit(postData) {
      console.log("你正在点击编辑");
      this.$create(PostEdit, { postData });
    },
    remove(data) {
      this.$create(DeletePost, { postIDs: [data] });
    },
    deleteSelect() {
      if (this.checkedNames.length) {
        this.$create(DeletePost, { postIDs: this.checkedNames });
      }
    }
  },
  watch: {
    checkedNames() {
      if (this.checkedNames.length === this.postData.length) {
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