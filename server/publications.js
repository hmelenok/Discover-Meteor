Meteor.publish('posts', function(options) {
    check(options, {
      sort: Object,
      limit: Number
    });

  return Posts.find({}, options);
});

Meteor.publish('comments', function(postId) {
  if(typeof postId === 'string'){
    check(postId, String);
    return Comments.find({postId: postId});
  }
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId, read: false});
});

Meteor.publish('singlePost', function(id) {
  if(typeof id === "string"){
    check(id, String);
    return id && Posts.find(id);
  }
});
