var convertToGetters = require('./helpers/convertToGetters');
var createFullUrl = require('./helpers/createFullUrl');

function httpDelete(url) {

  var urlGetters = convertToGetters(url);

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

    http.delete(fullUrl)
      .then(output.success)
      .catch(output.error);
  }

  action.async = true;
  action.displayName = 'http.delete ('  + ([].slice.call(arguments).join(', ')) + ')';

  return action;

}

module.exports = httpDelete;
