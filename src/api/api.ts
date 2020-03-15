import db from "./db";

const api: any = function() {};

api.prototype.createUser = function(name: string) {
  return db.transaction("rw", db.users, function() {
    return db.users.add({ name: name });
  });
};

api.prototype.getUsers = function() {
  return db.transaction("r", db.users, function() {
    return db.users.toArray();
  });
};

api.prototype.createDiscussion = function(
  user: object,
  topic: string,
  description: string
) {
  return db.transaction("rw", db.boards, function() {
    return db.boards.add({
      topic: topic,
      description: description,
      author: user
    });
  });
};

api.prototype.getDiscussions = function() {
  return db.transaction("r", db.boards, function() {
    return db.boards.toArray();
  });
};

api.prototype.getDiscussion = function(discussionId: number) {
  return db.transaction("r", db.boards, function() {
    return db.boards.get({ id: discussionId });
  });
};

api.prototype.getDisucssionMessage = function(discussionId: number) {
  return db.transaction("r", db.messages, function() {
    return db.messages.where({
      parentId: discussionId,
      parentType: "discussion"
    }).toArray();
  });
};

api.prototype.createDiscussionMessage = function(
  discussionId: number,
  content: string,
  author: object,
  createdAt: string
) {
  return db.transaction("rw", db.messages, function() {
    return db.messages.add({
      parentId: discussionId,
      parentType: "discussion",
      content: content,
      author: author,
      createdAt: createdAt
    });
  });
};

export default new api();
