var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var schema = new Schema({
    order:            { type: Number },
    qty:              { type: Number },
    price:            { type: Number },
    total:            { type: Number },
    orderItemProduct: { type: Schema.Types.ObjectId, ref:'Product' },
});

module.exports = mongoose.model('Item', schema);