<template>
  <div>
    <div class="discussion-topic">
      <h3>{{ discussion.topic }}</h3>
      <div>created by {{ discussion.author.name }}</div>
    </div>
    <div class="discussions">
      <div class="discussion-message">
        {{ discussion.description }}
      </div>
      <div
        class="discussion-message"
        v-for="(message, index) of messages"
        :key="index"
      >
        {{ message.content }}
        <div>
          {{ message.author.name }} commented at {{ message.createdAt }}
        </div>
      </div>
    </div>
    <div v-if="loginStatus">
      <div>新建评论</div>
      <textarea v-model="newMessage" />
      <div><button @click="createMessage">创建</button></div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      discussion: {},
      messages: [],
      newMessage: ""
    };
  },
  computed: {
    ...mapGetters(["loginStatus"]),
    discussionId() {
      return parseInt(this.$route.params.discussionId);
    }
  },
  methods: {
    ...mapActions({
      getDiscussion: "getDiscussion",
      getDiscussionMessage: "getDiscussionMessage",
      createDiscussionMessage: "createDiscussionMessage"
    }),
    initDiscussion() {
      this.getDiscussion(this.discussionId)
        .then(discussion => {
          this.discussion = discussion;
          return Promise.resolve();
        })
        .then(() => {
          this.fetchDiscussionMessage(this.discussionId);
        });
    },
    createMessage() {
      this.createDiscussionMessage({
        discussionId: this.discussionId,
        content: this.newMessage
      }).then(() => {
        this.fetchDiscussionMessage(this.discussionId);
        this.newMessage = "";
      });
    },
    fetchDiscussionMessage(discussionId) {
      this.getDiscussionMessage(discussionId).then(messages => {
        this.messages = messages;
      });
    }
  },
  created() {
    this.initDiscussion();
  }
};
</script>
<style lang="scss" scoped>
.discussion-topic {
  border: 1px solid black;
  padding: 20px;
}
.discussions {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid gray;
  padding: 20px;

  .discussion-message {
    padding: 10px;
    width: 100%;
    min-height: 40px;
    margin-bottom: 10px;
    border: 1px solid lightgray;
  }
}
</style>
