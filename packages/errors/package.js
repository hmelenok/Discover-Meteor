Package.describe({
  name: 'hmelenok:errors',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});


Package.onUse(function (api, where) {
api.versionsFrom('METEOR@0.9.0');

  api.use(['minimongo', 'mongo-livedata', 'templating'], 'client');

  api.add_files(['errors.js', 'errors_list.html', 'errors_list.js'], 'client');

  if (api.export)
    api.export('Errors');
});

Package.onTest(function(api) {
  api.use('hmelenok:errors','client');
  api.use(['tinytest', 'test-helpers'], 'client');
  api.addFiles('errors-tests.js','client');
});
