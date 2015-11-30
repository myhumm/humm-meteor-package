Package.describe({
  name: 'moeebadr:humm',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Use our API to build your own innovative -- and 100% legal -- music solutions or build music into your services.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/myhumm/humm-meteor-package.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.addFiles('humm.js');
});

Npm.depends({ 'humm': '0.0.5'});