var getCompiler = require('cerebral-url-scheme-compiler/get');
var convertToGetters = require('./helpers/convertToGetters');
var createFullUrl = require('./helpers/createFullUrl');

function post(url, dataPath) {

  var urlGetters = convertToGetters(url);
  var getValue = getCompiler(dataPath);

  function action(args) {
    var services = args.services;
    var httpPath = args['cerebral-module-http'];
    var http = httpPath.reduce(function (services, key) {
      return services[key];
    }, services);
    var output = args.output;

    if (!http) {
      throw 'Http action factories require \'cerebral-module-http\' module to be added to controller or current module';
    }

    var fullUrl = createFullUrl(urlGetters, args);

    http.post(fullUrl, getValue(args))
      .then(output.success)
      .catch(output.error);
  }

  action.async = true;
  action.displayName = 'http.post (' + ([].slice.call(arguments).join(', ')) + ')';

  return action;

}

module.exports = post;
