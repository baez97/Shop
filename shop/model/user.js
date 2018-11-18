var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var schema = new Schema({
    name:         { type: String, required: true },
    surname:      { type: String, required: true },
    email:        { type: String, required: true },
    birth:        { type: Date  , required: true },
    address:      { type: String, required: true },
    password:     { type: String, required: true },
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