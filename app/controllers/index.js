var rp = require('request-promise');
var config = require('../../config/local.json');

exports.show = function (req, res, next) {
  var options = {
    method: 'GET',
    uri: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=' + config.api_key
  };
  /*rp(options)
  .then(function(response) {
    //console.log(response);
    console.log('hi');
    res.render('index', { title: 'Express' });
  });*/
  res.render('index', { title: 'Express' });
};
