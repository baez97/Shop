var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var schema = new Schema({
    name:        { type: String },
    description: { type: String },
    price:       { type: Number },
    url:         { type: String },
});

module.exports = mongoose.model('Product', schema);