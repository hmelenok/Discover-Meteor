Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };

    Meteor.call('postInsert', post, function(error, result) {
      // display the error to the user and abort
      if (error)
         Errors.throw(error.reason);;

      // show this result but route anyway
      if (result.postExists)
        Errors.throw('This link has already been posted');

      Router.go('postPage', {_id: result._id});
    });
  }
});
