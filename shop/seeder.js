var mongoose     = require('mongoose');
var uri          = 'mongodb://localhost/shop';
mongoose.Promise = global.Promise;

var User         = require('./model/user.js');
var ShoppingCart = require('./model/shoppingCart');
var Order        = require('./model/order');
var Item         = require('./model/item');
var Product      = require('./model/product');

mongoose.connect(uri, {useNewUrlParser: true})
    .then(function() {
        return mongoose.connection.db.listCollections().toArray();
    })
    .then(function(list) {
        var promises = [];
        list.forEach( item => {
            switch( item.name ) {
                case "users":
                    promises.push(User.collection.drop());
                    break;
                case "shoppingCarts":
                    promises.push(ShoppingCart.collection.drop());
                    break;
                case "orders":
                    promises.push(Order.collection.drop());
                    break;
                case "items":
                    promises.push(Item.collection.drop());
                    break;
                case "products":
                    promises.push(Product.collection.drop());
                    break;
            }
        });

        return Promise.all(promises);
    })
    .then(function() {
        var promises = [];
        var products = [];
        for (var i = 0; i < 10; i++) {
            const product = new Product({
                name: "Product-"+i,
                description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
                price: (i+1)*10,
            });
            promises.push(product.save());
            products.push(product);
        }
        
        for (var i = 0; i < 10; i++) {
        
            var shoppingCart = new ShoppingCart({
                subtotal          : 0,
                tax               : 21,
                total             : 0,
                items             : []
            });
        
            var user = new User({
                id           : i,
                name         : "name-"+i,
                surname      : "surname-"+i,
                email        : "mail"+i+"@mail.com",
                birth        : "date-"+i,
                address      : "address-"+i,
                shoppingCart : shoppingCart,
                userOrders   : []
            });

            user.password = user.encryptPassword("pass-"+i);
        
            for ( j = 0; j < 5; j++ ) {
                var order = new Order({
                    user       : user,
                    number     : i*10+j,
                    date       : "date-"+j,
                    address    : "address-"+j,
                    subtotal   : 0,
                    tax        : 21,
                    total      : 0,
                    cardHolder : "card-holder-"+j,
                    cardNumber : j*100000 + j*233,
                    orderItems : []
                });
            
                for ( k = 0; k < 10; k++ ) {
                    var item = new Item({
                        order   : k,
                        qty     : k,
                        price   : k,
                        total   : k*k,
                        orderItemProduct : products[k]
                    })
            
                    if ( k == j ) {
                        shoppingCart.items.push(item);
                        shoppingCart.subtotal += item.total;
                        shoppingCart.total += (item.total * (1+shoppingCart.tax/100));
                        order.orderItems.push(item);
                        order.subtotal += item.total;
                        order.total += (item.total * (1+order.tax/100));
                        promises.push(item.save());
                    } 
                }
                user.userOrders.push(order);
                promises.push(order.save());
            }
            promises.push(user.save());

            promises.push(shoppingCart.save());
        }
        return Promise.all(promises);
    })
    .catch(function(err) {
        console.log('Error', err);
    })
    .then(function() {
        mongoose.disconnect();
    })