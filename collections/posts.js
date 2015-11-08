Posts = new Mongo.Collection('posts');

Posts.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    // разрешаем редактировать только следующие два поля:
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });

    var postWithSameLink = Posts.findOne({url: postAttributes.url});
    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      }
    }

    var user = Meteor.user();
    var post = _.extend(_.pick(postAttributes, 'url', 'message'), {
      title: postAttributes.title,
      userId: user._id,
      author: user.username,
      submitted: new Date(),
      commentsCount: 0,
      upvoters: [],
      votes: 0,
    });


    var postId = Posts.insert(post);
    return {
      _id: postId
    };
  },
  upvote: function(postId) {
    var user = Meteor.user();
    check(user, Object);
    // удостоверимся, что пользователь залогинен

    var post = Posts.findOne(postId);
    check(post, Object);

    if (_.include(post.upvoters, user._id) || !user || !post) { return false; }
    Posts.update(post._id, {
      $addToSet: {upvoters: user._id},
      $inc: {votes: 1}
    });
  },
});
