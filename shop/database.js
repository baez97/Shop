var mongoose = require('mongoose');
var debug = require('debug')('shop:database:debug');
var error = require('debug')('shop:database:error');

var uri = 'mongodb://localhost/shop';
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('connecting', function () {
    debug('Connecting to ', uri);
});
db.on('connected', function () {
    debug('Connected to ', uri);
});
db.on('disconnecting', function () {
    debug('Disconnecting from ', uri);
});
db.on('disconnected', function () {
    debug('Disconnected from ', uri);
});
db.on('error', function (err) {
    error(err.message);
});

module.exports = mongoose.connect( uri, {useNewUrlParser: true})
                    .catch( function(err) {
                        error(err.message);;
                    });
