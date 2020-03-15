<template>
  <div id="app">
    <router-view />
    <div class="footer">
      <router-link :to="{ name: 'Home' }" class="footer-item">
        Go Home
      </router-link>
      <span v-if="loginStatus" class="footer-item">
        现在使用的账户: {{ currentUser.name }}
      </span>
      <span v-else class="footer-item"
        >在<router-link :to="{ name: 'Admin' }">用户管理</router-link
        >中选择账户登录以评论</span
      >
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapGetters(["loginStatus"]),
    ...mapState(["currentUser"])
  }
};
</script>
<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.footer {
  margin-top: 20px;
  .footer-item:not(:last-child) {
    margin-right: 10px;
  }
}
</style>
