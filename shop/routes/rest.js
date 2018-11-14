var debug = require('debug')('shop:app:debug');
var error = require('debug')('shop:app:error');

var express      = require('express');
var router       = express.Router();
var User         = require('../model/user');
var ShoppingCart = require('../model/shoppingCart');
var Order        = require('../model/order');
var Item         = require('../model/item');
var Product      = require('../model/product');

// Products
router.get('/products', function(req, res, next) {
    Product.find()
        .then(function(products) {
            res.json(products);
        })
        .catch(function (e) {
            error(e.message);
            res.status(500).json(e);
        });
});

router.get('/products/:pid', function(req, res, next) {
    Product.findById( req.params.pid )
        .then( function(product) {
            res.json(product);
        })
        .catch( function (e) {
            error(e.message);
            res.status(500).json(e);
        })
});

// Shopping Cart
router.get('/users/:uid/cart', function(req, res, next) {
    User.findOne({ _id: req.params.uid })
        .populate({
            path: 'shoppingCart',
            populate: {
                path: 'items',
                model: 'Item',
                populate: {
                    path: 'orderItemProduct',
                    model: 'Product'
                }
            }
        })
        .exec( function (err, user) {
            if ( user ) {
                res.json(user.shoppingCart);
            } else {
                res.status(500).json(err);
            }
        });
});

router.get('/users/:uid/cart/items', function(req, res, next) {
    User.findOne({ _id: req.params.uid })
        .populate({
            path: 'shoppingCart',
            populate: {
                path: 'items',
                model: 'Item',
                populate: {
                    path: 'orderItemProduct',
                    model: 'Product'
                }
            }
        })
        .exec( function (err, user) {
            if ( user ) {
                res.json(user.shoppingCart.items);
            } else {
                res.status(500).json(err);
            }
        });
});

router.post('/users/:uid/cart/items/:pid', function(req, res, next) {
    var pid = req.params.pid;
    User.findOne({ _id: req.params.uid })
        .populate({
            path: 'shoppingCart',
            populate: {
                path: 'items',
                model: 'Item',
                populate: {
                    path: 'orderItemProduct',
                    model: 'Product'
                }
            }
        })
        .exec( function (err, user) {
            var items = user.shoppingCart.items;
            var i = items.find( (it) => {
                return it.orderItemProduct._id == pid;
            });
            if ( i ) {
                i.qty++;
                i.total+= i.orderItemProduct.price;
                res.json({ok: i});
                return i.save();
            } else {
                var promises = [];

                Product.findById(pid)
                    .then( function ( product ) {
                        var item = new Item({
                            qty: 1,
                            order: undefined,
                            orderItemProduct: product,
                            total: product.price
                        });
                        promises.push(item.save());
                        user.shoppingCart.items.push(item);
                        promises.push(user.shoppingCart.save());

                        return Promise.all(promises);
                    })
                    .then( result => {
                        res.json({ok: result});
                    })
                    .catch( function ( error ) {
                        res.status(500).json(error);
                    })
            }
        });


    // Item.findById(req.params.pid)
    //     .then( function (item) {
    //         item.qty++;
    //         return item.save();
    //     })
    //     .then(function(result) {
    //         res.json({ok: result});
    //     })
    //     .catch(function(e) {
    //         error(e.message);
    //         res.status(500).json(e);
    //     })
});

router.delete('/users/:uid/cart/items/:pid', function(req, res, next) {
    Item.findByIdAndRemove(req.params.pid)
        .then(function(result) {
            res.json({ok: result});
        })
        .catch(function(e) {
            error(e.message);
            res.status(500).json(e);
        })
});

router.delete('/users/:uid/cart/items/:pid/decrease', function(req, res, next) {
    Item.findById(req.params.pid)
        .then( function (item) {
            item.qty--;
            return item.save();
        })
        .then(function(result) {
            res.json({ok: result});
        })
        .catch(function(e) {
            error(e.message);
            res.status(500).json(e);
        })
});

// Orders
router.get('/users/:uid/orders', function(req, res, next) {
    User.findOne({ _id: req.params.uid })
        .populate('userOrders')
        .exec( function (err, user) {
            if ( user ) {
                res.json(user);
            } else {
                res.status(500).json(err);
            }
        })
});

router.post('/users/:uid/orders', function(req, res, next) {
    console.log(req.body);
    User.findOne({ _id: req.params.uid })
        .then( function(user) {
            Order.count({})
                .then(function(number) {
                    var o = req.body;
                    o.number = number+1;

                    var order = new Order(o);
                    user.userOrders.push( order );

                    return Promise.all([order.save(), user.save()]);
                });
        })
        .then( function(result) {
            res.json({ok: result});
        })
        .catch(function(e) {
            error(e.message);
            res.status(500).json(e);
        })
});

router.get('/users/:uid/orders/:number', function(req, res, next) {
    Order.findOne({ number: req.params.number, user: req.params.uid})
        .populate([{
            path: 'user',
            model: 'User'
        }, {
            path: 'orderItems',
            model: 'Item',
            populate: {
                path: 'orderItemProduct',
                model: 'Product'
            }
        }])
        .exec( function (err, order) {
            if ( order ) {
                res.json(order);
            } else {
                res.status(500).json(err);
            }
        })
});

router.get('/users/:uid/orders/:number/items', function(req, res, next) {
    Order.findOne({ number: req.params.number, user: req.params.uid})
        .populate('orderItems')
        .exec( function (err, order) {
            if ( order ) {
                res.json(order.orderItems);
            } else {
                res.status(500).json(err);
            }
        })
});

// Users (Remove this)
router.get('/users/:uid', function (req, res) {
    User.findById(req.params.id) 
        .then( (result) => {
            res.json(result);
        })
})

module.exports = router;