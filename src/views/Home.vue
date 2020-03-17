<template>
  <div class="home">
    <h3 v-if="loginStatus">Hello, {{ user && user.name }}!</h3>
    <h3 v-else>Hello, Anonymous!</h3>
    <div>
      <router-link :to="{ name: 'DiscussionBoard' }">
        查看讨论
      </router-link>
    </div>
    <div v-if="loginStatus">
      <router-link :to="{ name: 'Admin' }">
        用户管理
      </router-link>
    </div>
    <div v-if="loginStatus">
      <a href="#" @click="logout">退出登录</a>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapState({
      user: state => state.currentUser
    }),
    ...mapGetters(["loginStatus"])
  },
  methods: {
    ...mapActions(["logout"])
  }
};
</script>
