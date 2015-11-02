Comments = new Meteor.Collection('comments');

Meteor.methods({
  comment: function(commentAttributes) {
    check(commentAttributes, {body: String, postId: String});


    var user = Meteor.user();
    var post = Posts.findOne(commentAttributes.postId);
    // ensure the user is logged in
    check(user, Object);
    check(post, Object);

    comment = _.extend(_.pick(commentAttributes, 'postId', 'body'), {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });
    check(comment, {
      body: String,
      postId: String,
      userId: String,
      author: String,
      submitted: Number,
    });
    Posts.update(comment.postId, {$inc: {commentsCount: 1}});
    // создаем комментарий и сохраняем id
    comment._id = Comments.insert(comment);
    // создаем уведомление, информируя пользователя о новом комментарии
    createCommentNotification(comment);
    return comment._id;
  }
});
