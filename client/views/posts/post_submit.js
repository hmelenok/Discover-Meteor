Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };
    if(!post.url || !post.title){
      Errors.throw('Fields not filled!');
      return false;
    }
    Meteor.call('postInsert', post, function(error, result) {
      // display the error to the user and abort
      if (error){
        Errors.throw(error.reason);;
      }
      // show this result but route anyway
      else if (result.postExists){
        // Router.go('postPage', {_id: result._id});
        Errors.throw('This link has already been posted');
      }
      else if (!result.postExists && error) {
        Router.go('postPage', {_id: result._id});
      }
    });
  }
});
