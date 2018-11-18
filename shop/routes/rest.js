var debug = require('debug')('shop:app:debug');
var error = require('debug')('shop:app:error');

var express      = require('express');
var router       = express.Router();
var User         = require('../model/user');
var ShoppingCart = require('../model/shoppingCart');
var Order        = require('../model/order');
var Item         = require('../model/item');
var Product      = require('../model/product');
const jwt        = require('jsonwebtoken');
const passport   = require('passport');
const passportConfig = require('../config/passport');

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
router.get('/users/:uid/cart', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    var token = getToken(req.headers);
    if (token) {
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
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

router.get('/users/:uid/cart/items', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    var token = getToken(req.headers);
    if (token) {
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
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

router.post('/users/:uid/cart/items/:pid', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    var token = getToken(req.headers);
    if (token) {
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
                    user.shoppingCart.subtotal += i.orderItemProduct.price;
                    user.shoppingCart.tax = user.shoppingCart.subtotal * 0.21;
                    user.shoppingCart.total = user.shoppingCart.subtotal + user.shoppingCart.tax;
                    res.json({ok: i});
                    return Promise.all([i.save(), user.shoppingCart.save()]);
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
                            user.shoppingCart.subtotal += product.price;
                            user.shoppingCart.tax = user.shoppingCart.subtotal * 0.21;
                            user.shoppingCart.total = user.shoppingCart.subtotal + user.shoppingCart.tax;
                            console.log(`${user.shoppingCart.subtotal} => ${user.shoppingCart.total}`);

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
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

router.delete('/users/:uid/cart/clear', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        var u, c = undefined;
        User.findById(req.params.uid)
        .then ( user => {
            u = user;
            return ShoppingCart.findByIdAndRemove(user.shoppingCart)
        })
        .then ( results => {
            c = new ShoppingCart();
            return c.save();
        })
        .then ( r => {
            u.shoppingCart = c;
            return u.save();
        })
        .then ( result => {
            res.json(result);
        })
        .catch ( error => {
            res.status(500).json(error);
        })
            
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

router.delete('/users/:uid/cart/items/:pid', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    var token = getToken(req.headers);
    if (token) {
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
                    user.shoppingCart.subtotal -= (i.orderItemProduct.price * i.qty);
                    user.shoppingCart.tax = user.shoppingCart.subtotal * 0.21;
                    user.shoppingCart.total = user.shoppingCart.subtotal + user.shoppingCart.tax;

                    var promise = user.shoppingCart.save();

                    Item.findByIdAndRemove(i._id)
                        .then( function( result ) {
                            res.json({ok: result});
                            return promise;
                        })
                        .catch( function( error ) {
                            res.status(500).json(error)
                        })
                    
                    return Promise.all(promise);
                    
                } else {
                    res.json({error: "item not found"});
                }
            });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

router.delete('/users/:uid/cart/items/:pid/decrease', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    var token = getToken(req.headers);
    if (token) {
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
                    var promises = [];
                    i.qty--;
                    i.total-= i.orderItemProduct.price;
                    user.shoppingCart.subtotal -= i.orderItemProduct.price;
                    user.shoppingCart.tax = user.shoppingCart.subtotal * 0.21;
                    user.shoppingCart.total = user.shoppingCart.subtotal + user.shoppingCart.tax;
                    promises.push(user.shoppingCart.save());

                    if ( !i.qty ) {
                        Item.findByIdAndRemove(i._id)
                            .then( function( result ) {
                                res.json({ok: result});
                            })
                            .catch( function( error ) {
                                res.status(500).json(error)
                            })
                    } else {
                        promises.push(i.save());
                    }

                    res.json({ok: i});
                    return Promise.all(promises);
                    
                } else {
                    res.json({error: "item not found"});
                }
            });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

// Orders
router.get('/users/:uid/orders', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        User.findOne({ _id: req.params.uid })
            .populate('userOrders')
            .exec( function (err, user) {
                if ( user ) {
                    res.json(user);
                } else {
                    res.status(500).json(err);
                }
            })
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

router.post('/users/:uid/orders', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        User.findOne({ _id: req.params.uid })
            .then( function(user) {
                Order.count({})
                    .then(function(number) {
                        var o = req.body;
                        o.number = number+1;
                        o.user = user;

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
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

router.get('/users/:uid/orders/:number', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        var ObjectId = require('mongoose').Types.ObjectId; 

        Order.findOne({ number: req.params.number, user: new ObjectId(req.params.uid)})
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
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

router.get('/users/:uid/orders/:number/items', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        Order.findOne({ number: req.params.number, user: req.params.uid})
            .populate('orderItems')
            .exec( function (err, order) {
                if ( order ) {
                    res.json(order.orderItems);
                } else {
                    res.status(500).json(err);
                }
            })
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

// Users (Remove this)
router.get('/users/:uid', function (req, res) {
    User.findById(req.params.id) 
        .then( (result) => {
            res.json(result);
        })
})

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = router;