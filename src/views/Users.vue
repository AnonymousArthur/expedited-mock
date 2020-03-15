<template>
  <div>
    <div>
      <input v-model="newUserName" /><button @click="addUser(newUserName)">
        添加用户
      </button>
    </div>
    <ul>
      <li v-for="(user, index) of users" :key="index">
        id: {{ user.id }} name: {{ user.name }}
        <a href="#" @click="login(user)">使用此用户登录</a>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data: function() {
    return {
      users: [],
      newUserName: ""
    };
  },
  created() {
    this.fetchUserList();
  },
  methods: {
    ...mapActions({
      addUser: "createUser",
      getUsers: "getUsers",
      login: "loginAsUser"
    }),
    fetchUserList() {
      this.getUsers()
        .then(users => {
          this.users = users;
        })
        .then(() => {
          this.fetchUserList();
        });
    }
  }
};
</script>
