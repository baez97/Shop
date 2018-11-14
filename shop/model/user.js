var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var schema = new Schema({
    name:         { type: String },
    surname:      { type: String },
    email:        { type: String },
    birth:        { type: Date },
    address:      { type: String },
    password:     { type: String },
    shoppingCart: { type: Schema.Types.ObjectId, ref: 'ShoppingCart' },
    userOrders:  [{ type: Schema.Types.ObjectId, ref:'Order' }]
});

schema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

schema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password , this.password); 
};

module.exports = mongoose.model('User', schema);