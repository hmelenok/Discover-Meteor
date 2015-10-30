Meteor.publish('posts', function() {
  return Posts.find();
});

Meteor.publish('comments', function(postId) {
    check(postId, String);
    return Comments.find({postId: postId});

});
 Meteor.publish('commentsAll', function() {
     return Comments.find();
 })
