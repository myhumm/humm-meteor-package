Package.describe({
  name: 'humm:humm',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Use our API to build your own innovative -- and 100% legal -- music solutions or build music into your services.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/myhumm/humm-meteor-package.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({ humm: '0.0.7' });

Package.onUse(function(api) {

  api.versionsFrom('1.1');
  api.use(['cosmos:browserify@0.9.2'], 'client'); // need this package to expose to client
  api.use(['underscore'], ['client', 'server']);

  api.addFiles('humm.browserify.js', 'client');
  api.addFiles('humm.js', 'server');
  api.export('humm', ['client', 'server']);

});
