<template>
  <div>
    <ul>
      <li v-for="(discussion, index) of discussions" :key="index">
        <router-link
          :to="{ name: 'Discussion', params: { discussionId: discussion.id } }"
        >
          <div class="discussion-card">
            <div class="discussion-topic">Topic: {{ discussion.topic }}</div>
            <div class="discussion-description">
              {{ discussion.description }}
            </div>
          </div>
        </router-link>
      </li>
    </ul>
    <div v-if="loginStatus">
      <div>Topic:</div>
      <div><input v-model="newTopic" /></div>
      <div>Description:</div>
      <div><input v-model="newDescription" /></div>
      <div>
        <button @click="createNewDiscussion">
          创建
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => {
    return {
      discussions: [],
      newTopic: "",
      newDescription: ""
    };
  },
  computed: {
    ...mapGetters(["loginStatus"])
  },
  methods: {
    ...mapActions({
      createDiscussion: "createDiscussion",
      getDiscussions: "getDiscussions"
    }),
    fetchDiscussions() {
      this.getDiscussions().then(discussions => {
        this.discussions = discussions;
      });
    },
    createNewDiscussion() {
      this.createDiscussion({
        topic: this.newTopic,
        description: this.newDescription
      }).then(() => {
        this.fetchDiscussions();
        this.newTopic = "";
        this.newDescription = "";
      });
    }
  },
  created() {
    this.fetchDiscussions();
  }
};
</script>
<style lang="scss" scoped>
ul {
  list-style-type: none;
  padding-left: 0;
}
.discussion-card {
  padding: 10px;
  border: 1px solid black;
  margin-bottom: 10px;
  .discussion-title {
    font-weight: bold;
  }

  .discussion-description {
    font-style: italic;
  }
}
</style>
