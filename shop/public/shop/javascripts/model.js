var model = {
    users: [],
    products: [],
};

for (var i = 0; i < 10; i++) {
    const product = {
        name: "Product-"+i,
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        price: (i+1)*10,
    }
    model.products.push(product)
}

for (var i = 0; i < 10; i++) {

    var shoppingCart = {
        subtotal          : i,
        tax               : i*0.21,
        total             : i * i*0.21,
        shoppingCartItems : []
    } 

    var user = {
        id           : i,
        name         : "name-"+i,
        surname      : "surname-"+i,
        email        : "mail"+i+"@mail.com",
        birth        : "date-"+i,
        address      : "address-"+i,
        password     : "pass_"+i,
        shoppingCart : shoppingCart,
        userOrders   : []
    }

    for ( j = 0; j < 5; j++ ) {
        var order = {
            number     : j,
            date       : "date-"+j,
            address    : "address-"+j,
            subtotal   : j,
            tax        : j,
            total      : j*(j/100 + 1),
            cardHolder : "card-holder-"+j,
            cardNumber : j*100000 + j*233,
            orderItems : []
        }
    
        for ( k = 0; k < 10; k++ ) {
        
            var item = {
                order   : k,
                qty     : k,
                price   : k,
                total   : k*k,
                product : model.products[k]
            }
    
            order.orderItems.push(item);
            if ( k == j ) {
                shoppingCart.shoppingCartItems.push(item);
            } 
        }
        user.userOrders.push(order);
    }
    model.users.push(user);
}

model.getProduct = function (id, callback) {
    var product = model.products[id];
    var result = {
        name        : product.name,
        description : product.description,
        price       : product.price
    }
    return callback(result);
};

model.getUsers = function (callback) {
    var results = [];
    model.users.forEach( user => {
        model.getUser(user.id, function(result) {
            results.push(result);
        });
    });
    return callback(results);
};

model.getProducts = function (callback) {
    var results = []
    model.products.forEach( product => {
        results.push({
            name        : product.name,
            description : product.description,
            price       : product.price
        });
    });
    return callback(results);
};



