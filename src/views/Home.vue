<template>
  <div class="home">
    <h3 v-if="loginStatus">Hello, {{ user && user.name }}!</h3>
    <h3 v-else>Hello, Anonymous!</h3>
    <router-link :to="{ name: 'DiscussionBoard' }">
      查看讨论
    </router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapState({
      user: state => state.currentUser
    }),
    loginStatus() {
      return !!this.user;
    }
  },
  components: {}
};
</script>
