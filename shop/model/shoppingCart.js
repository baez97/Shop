var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    subtotal: { type: Number, default: 0 },
    tax:      { type: Number, default: 0 },
    total:    { type: Number, default: 0 },
    items:   [{ type: Schema.Types.ObjectId, ref:'Item' }]
});

module.exports = mongoose.model('ShoppingCart', schema);