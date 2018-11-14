const getShoppingCart = (id) => {
    var p = new Promise( function(resolve, reject) {
       $.ajax(`/shop/rest/users/${id}/cart`)
        .done( (result) => {
            resolve(result);
        })
        .fail( (error) => {
            reject(error);
        }); 
    });
    return p;
}

const getCartItems = (id) => {
    var p = new Promise( function(resolve, reject) {
        $.ajax(`/shop/rest/users/${id}/cart/items`)
        .done( (result) => {
            resolve(result);
        })
        .fail( (error) => {
            reject(error);
        })
    });
    return p;
}

const addOrder = (id, order) => {
    var p = new Promise( function(resolve, reject) {
        $.ajax({
            url: `/shop/rest/users/${id}/orders`,
            method: "POST",
            contentType: "application/json",
            data: order
        })
        .done( (result) => {
            resolve(result);
        })
        .fail( (error) => {
            reject(error);
        })
    });
    return p;
}

const getOrder = (id, number) => {
    var p = new Promise( function(resolve, reject) {
        $.ajax(`/shop/rest/users/${id}/orders/${number}`)
         .done( (result) => {
             resolve(result);
         })
         .fail( (error) => {
             reject(error);
         }); 
     });
     return p;
}

const getOrders = (id) => {
    var p = new Promise( function(resolve, reject) {
        $.ajax(`/shop/rest/users/${id}/orders`)
         .done( (result) => {
             resolve(result);
         })
         .fail( (error) => {
             reject(error);
         }); 
     });
     return p;
}

const getProducts = () => {
    var p = new Promise( function(resolve, reject) {
        $.ajax(`/shop/rest/products`)
         .done( (result) => {
             resolve(result);
         })
         .fail( (error) => {
             reject(error);
         }); 
     });
     return p;
}

const addProduct = (uid, pid, event) => {
    $.ajax({
        url: `/shop/rest/users/${uid}/cart/items/${pid}`,
        method: "POST",
        contentType: "application/json",
        data: {}
    })
    .done( (result) => {
        go(event, '/shop/views/user/2/cart');
    })
    .fail( (error) => {
        reject(error);
    })
}

function createOrder(event) {
    getCartItems('5be9e0625a3778086b0a1d0a')
        .then( function(items) {
            var order = {
                cardNumber : $('#cardNumber').val(),
                cardHolder : $('#cardHolder').val(),
                subtotal   : parseFloat($('#subtotal').text()),
                total      : parseFloat($('#total').text()),
                tax        : parseFloat($('#tax').text()),
                orderItems : items,
                number     : undefined,
                date       : Date.now()
            };
            addOrder('5be9e0625a3778086b0a1d0a', JSON.stringify(order))
                .then( () => {
                    console.log("New order added correctly");
                    go(event, '/shop/views');
                })
        })
}
