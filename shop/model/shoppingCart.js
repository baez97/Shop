var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    subtotal: { type: Number },
    tax:      { type: Number },
    total:    { type: Number },
    items:   [{ type: Schema.Types.ObjectId, ref:'Item' }]
});

module.exports = mongoose.model('ShoppingCart', schema);