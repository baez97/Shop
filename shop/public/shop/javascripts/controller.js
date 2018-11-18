var Controller = { SigninForm: {}, SignupForm: {}, Signout: {}, Order: {}, Profile: {}, ShoppingCart: {}, Purchase: {}, Profile: {}, ProductList: {}, NavBar: {} };
var modelProxy = new modelProxy();

Controller.SigninForm.getUser = () => {
    return {
        email: $('#email').val(),
        password: $('#password').val()
    };
}
Controller.SigninForm.setUser = (user) => {
    $('#email').val(user.email); $('#password').val('')
}
Controller.SigninForm.clearUser = () => {
    $('#email').val(''); $('#password').val('')
}
Controller.SigninForm.validateForm = () => {
    var valid;
    valid = $('#signin-form')[0].checkValidity();
    $('#signin-form').addClass('was-validated');
    return valid;
}

Controller.SigninForm.signin = (event) => {
    Messages.all(); // Clears messages
    var user = Controller.SigninForm.getUser();
    var valid = Controller.SigninForm.validateForm();

    if (valid) {
        return Passport.signin(user)
            .done(function (result) {
                Messages.info('Welcome ');
                console.log('Signin success', result)
                Passport.setToken(result);
                go(event, '/shop/views/');
            })
            .fail(function (result) {
                var errors = result.responseJSON.errors
                if (errors) {
                    var messages = Object.values(errors);
                    for (let index = 0; index < messages.length; index++) {
                        const message = messages[index];
                        Messages.error(message.message);
                    }
                }
                go(event, '/shop/views/signin');
            });
    } else {
        Messages.error('Invalid form data');
    }
}

Controller.SignupForm.getUser = () => {
    return {
        email     : $('#email').val(),
        password  : $('#password').val(),
        password2 : $('#password2').val(),
        name      : $('#name').val(),
        surname   : $('#surname').val(),
        birth     : $('#birth').val(),
        address   : $('#address').val()
    };
}

Controller.SignupForm.setUser = (user) => {
    $('#email').val(user.email);
    $('#password').val('');
    $('#name').val(user.name);
    $('#surname').val(user.surname);
    $('#birth').val(user.birth);
    $('#address').val(user.address)
}

Controller.SignupForm.clearUser = () => {
    $('#email').val(''); $('#password').val('');
    $('#name').val('');
    $('#surname').val('');
    $('#birth').val('');
    $('#address').val('');
}

Controller.SignupForm.validateForm = () => {
    // var forms = $('.form-control');
    // for (let i = 0; i < forms.length; i++) {
    //     if (!forms[i].checkValidity()) {
    //         valid = false;
    //         return;
    //     }
    // }
    var valid = $('#signup-form')[0].checkValidity();
    $('#signup-form').addClass('was-validated');
    return valid;
}

Controller.SignupForm.signupClicked = (event) => {
    Messages.all(); // Clears messages
    var user = Controller.SignupForm.getUser();
    var validForm = Controller.SignupForm.validateForm(); 
    if (validForm) {
        console.log(validForm);
        var passwordMatch = user.password == user.password2; 
        if (!passwordMatch) {
            console.log("Password Mismatch");
            Messages.error('Password mismatch');
            go(event, '/shop/views/signup');
            return;
        }
        return Passport.signup(user)
            .done(function (result) {
                console.log("Signup Success");
                Messages.info('Signup Success');
                go(event, '/shop/views/');
            })
            .fail(function (result) {
                console.log(result);
                var errors = result.responseJSON.errors
                if (errors) {
                    var messages = Object.values(errors);
                    for (let index = 0; index < messages.length; index++) {
                        const message = messages[index]; 
                        Messages.error(message.message);
                    }
                }
                go(event, '/shop/views/signup');
            });
    } else {
        console.log("I'm here");
    }
};

var SCController = Controller.ShoppingCart;

Controller.ShoppingCart.shoppingCart = undefined;
Controller.ShoppingCart.clicked = (event) => {
    Passport.profile()
        .done( result => {
            modelProxy.getShoppingCart(result._id)
            .then( (cart) => {
                SCController.shoppingCart = cart;
                go(event, `/shop/views/user/${result._id}/cart`);
            })
            .catch ( (error) => {
                Messages.error("Could not get your shopping cart");
                go(event, `/shop/views/`);
            })
        })
        .fail( (err) => { 
            Messages.error('Not logged in');
            go(event, `/shop/views`);
        })
}
Controller.ShoppingCart.loadCart = () => {
    var p = new Promise((resolve, reject) => {
        Passport.profile()
            .done(result => {
                modelProxy.getShoppingCart(result._id)
                .then(cart => {
                    resolve(cart);
                })
                .catch(error => {
                    reject(cart);
                })
            })
            .fail(error => {
                Messages.error("Could not load cart");
            })
    });
    return p;
}
Controller.ShoppingCart.decreaseItem = (pid, event) => {
    Passport.profile()
        .done( result => {
            modelProxy.decreaseItem(result._id, pid)
            .then( () => {
                Messages.info("Item decreased correctly");
                go(event, `/shop/views/user/${result._id}/cart`);
            })
            .catch( () => {
                Messages.error("Could not remove item");
                go(event, `/shop/views/user/${result._id}/cart`);                
            })
        })
}

Controller.ShoppingCart.removeItem = (pid, event) => {
    Passport.profile()
        .done( result => {
            modelProxy.removeItem(result._id, pid)
            .then( () => {
                Messages.info("Item removed correctly");
                go(event, `/shop/views/user/${result._id}/cart`);
            })
            .catch( () => {
                Messages.error("Could not remove item");
                go(event, `/shop/views/user/${result._id}/cart`);                
            })
        })
}

Controller.ShoppingCart.purchaseClicked = (id) => {
    Passport.profile()
        .done( result => {
            go(event, `/shop/views/user/${result._id}/purchase`);
        })
        .fail( (err) => { 
            Messages.error(err.responseText);
        })
}

Controller.Purchase.shoppingCart = undefined;
Controller.Purchase.clicked = (event) => {
    Passport.profile()
        .done( result => {
            modelProxy.getShoppingCart(result._id)
            .then( cart => {
                if (cart.items.length) {
                    go(event, `/shop/views/user/${result._id}/purchase`)
                } else {
                    Messages.error("Cart is empty");
                    go(event, `/shop/views/`);
                }
            })

        })
        .fail( error => {
            Messages.error('Not logged in');
            go(event, `/shop/views`);
        })
}

Controller.Purchase.getContext = () => {
    var p = new Promise( (resolve, reject) => {
        Passport.profile()
            .done( result => {
                modelProxy.getShoppingCart(result._id)
                .then( (cart) => {
                    var context = {
                        address    : $('#address').val(),
                        cardNumber : $('#cardNumber').val(),
                        cardHolder : $('#cardHolder').val(),
                        password   : $('#password').val(),
                        subtotal   : cart.subtotal,
                        total      : cart.total,
                        tax        : cart.tax,
                        orderItems : cart.items,
                        number     : undefined,
                        date       : new Date()
                    }

                    resolve(context);
                })
                .catch( (error) => {
                    Mesagges.error("Could not load your Shopping Cart");
                    reject(error);
                })
            })
            .fail( error => {
                Messages.error(error.responseText);
            })
    });
    return p;
}

Controller.Purchase.createOrder = (event) => {
    Passport.profile()
    .done( result => {
        Controller.Purchase.getContext()
            .then( (context) => {
                return modelProxy.addOrder( result._id, context )
            })
            .then( r => {
                Messages.info("Purchased!");
                return modelProxy.clearShoppingCart(result._id)
            })
            .then( result => {
                go(event, `/shop/views`);
            })
            .catch( error => {
                Messages.error("Could not add order");
                go(event, `/shop/views/user/${result._id}/purchase`);
            })
    })
    .fail( error => {

    })
}

Controller.ProductList.productClicked = (pid, event) => {
    Passport.profile()
    .done( result => {
        modelProxy.addProduct(result._id, pid)
        .then ( (result ) => {
            Messages.info("Product Added");
            go(event, `/shop/views/user/${result._id}/cart`);
        })
    })
    .fail( error => {
        Messages.error('Not logged in');
        go(event, `/shop/views`);
    })
}

Controller.Signout.clicked = (event) => {
    Passport.profile()
    .done( result => {
        Passport.signout();
        Messages.info("Logged out");
        go(event, `/shop/views`)
    })
    .fail( error => {
        Messages.error('Not logged in');
        go(event, `/shop/views`)
    })
}

Controller.Profile.clicked = (event) => {
    Passport.profile()
    .done( result => {
        go(event, `/shop/views/user/${result._id}/`)
    })
    .fail( error => {
        Messages.error('Not Logged in');
        go(event, `/shop/views`)
    })
}

Controller.Order.clicked = (number, event) => {
    console.log(number);
    Passport.profile()
    .done( result => {
        go(event, `/shop/views/user/${result._id}/orders/${number}`);
    })
    .fail( error => {
        Messages.error('Not Logged in');
        go(event, `/shop/views`)
    })
}

Controller.Order.getOrder = (number) => {
    var p = new Promise( (resolve, reject) => {
        Passport.profile()
        .done( result => {
            modelProxy.getOrder(result._id, number)
            .then( (order) => {
                resolve(order);
            })
            .catch( (error) => {
                reject(error);
            })
        })
        .fail( error => {
            Messages.error('Not Logged in');
            go(event, `/shop/views`)
        })
    });

    return p;
}



