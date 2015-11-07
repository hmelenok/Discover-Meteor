Meteor.publish('posts', function(options) {
  check(options, Match.Any);
  if(typeof options == 'object'){
    check(options, {sort: Object, limit: Number});
    return Posts.find({},options);
  }

});

Meteor.publish('comments', function(postId) {
    check(postId, String);
    return Comments.find({postId: postId});

});
Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId, read: false});
});
