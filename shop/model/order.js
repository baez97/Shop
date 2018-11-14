var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var schema = new Schema({
    number:      { type: Number },
    date:        { type: Date },
    address:     { type: String },
    subtotal:    { type: Number },
    tax:         { type: Number },
    total:       { type: Number },
    cardHolder:  { type: String },
    cardNumber:  { type: Number },
    orderItems: [{ type: Schema.Types.ObjectId, ref:'Item' }],
    user:        { type: Schema.Types.ObjectId, ref:'User' },
});

module.exports = mongoose.model('Order', schema);