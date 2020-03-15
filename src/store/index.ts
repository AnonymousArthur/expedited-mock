import Vue from "vue";
import Vuex from "vuex";
import api from "../api/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null
  },
  mutations: {
    login(state, user) {
      state.currentUser = user;
    },
    logout(state) {
      state.currentUser = null;
    }
  },
  actions: {
    createUser({}, name) {
      return api.createUser(name);
    },
    getUsers() {
      return api.getUsers();
    },
    loginAsUser({ commit }, user) {
      commit("login", user);
    },
    logout({ commit }) {
      commit("logout");
    },
    createDiscussion({ state }, { topic, description }) {
      if (state.currentUser) {
        return api.createDiscussion(state.currentUser, topic, description);
      } else {
        return Promise.reject("Error: please login");
      }
    },
    getDiscussions() {
      return api.getDiscussions();
    },
    getDiscussion({}, discussionId) {
      return api.getDiscussion(discussionId);
    },
    getDiscussionMessage({}, discussionId) {
      return api.getDisucssionMessage(discussionId);
    },
    createDiscussionMessage({ state }, { discussionId, content }) {
      return api.createDiscussionMessage(
        discussionId,
        content,
        state.currentUser,
        new Date().toISOString()
      );
    }
  },
  modules: {},
  getters: {
    loginStatus: state => {
      return !!state.currentUser;
    }
  }
});
