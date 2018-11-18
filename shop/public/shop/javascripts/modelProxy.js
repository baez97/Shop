var passUserId = '5bebdf1765818e097c721ed3'

function modelProxy() {
    this.getShoppingCart = function(id) {
        var p = new Promise( function(resolve, reject) {
           $.ajax({
                url: `/shop/rest/users/${id}/cart`,
                method: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + Passport.getToken());
                }
            })
            .done( (result) => {
                resolve(result);
            })
            .fail( (error) => {
                reject(error);
            }); 
        });
        return p;
    }

    this.addOrder = (uid, order) => {
        var p = new Promise( function(resolve, reject) {
            $.ajax({
                url: `/shop/rest/users/${uid}/orders`,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(order),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + Passport.getToken());
                }
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

    this.decreaseItem = (uid, id) => {
        var p = new Promise( function (resolve, reject) {
            $.ajax({
                url: `/shop/rest/users/${uid}/cart/items/${id}/decrease`,
                method: "DELETE",
                contentType: "application/json",
                data: {},
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + Passport.getToken());
                }
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
    
    this.removeItem = (uid, id) => {
        var p = new Promise( function (resolve, reject) {
            $.ajax({
                url: `/shop/rest/users/${uid}/cart/items/${id}/`,
                method: "DELETE",
                contentType: "application/json",
                data: {},
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + Passport.getToken());
                }
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

    this.clearShoppingCart = (id) => {
        var p = new Promise( function(resolve, reject) {
            $.ajax({
                url: `/shop/rest/users/${id}/cart/clear`,
                method: "DELETE",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + Passport.getToken());
                }
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

    this.addProduct = (uid, pid) => {
        var p = new Promise( (resolve, reject) => {
            $.ajax({
                url: `/shop/rest/users/${uid}/cart/items/${pid}`,
                method: "POST",
                contentType: "application/json",
                data: {},
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + Passport.getToken());
                }
            })
            .done( (result) => {
                resolve(result);
            })
            .fail( (error) => {
                reject(error);
            })
        })
    
        return p;
    }


    this.getOrders = (id) => {
        var p = new Promise( function(resolve, reject) {
            $.ajax({
                url: `/shop/rest/users/${id}/orders`,
                method: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + Passport.getToken());
                }
            })
            .done( (result) => {
                resolve(result);
            })
            .fail( (error) => {
                reject(error);
            }); 
        });
        return p;
    }

    this.getOrder = (id, number) => {
        var p = new Promise( function(resolve, reject) {
            $.ajax({
                url: `/shop/rest/users/${id}/orders/${number}`,
                method: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + Passport.getToken());
                }
            })
            .done( (result) => {
                resolve(result);
            })
            .fail( (error) => {
                reject(error);
            }); 
         });
         return p;
    }
}

const getShoppingCart = (id) => {
    var p = new Promise( function(resolve, reject) {
       $.ajax({
            url: `/shop/rest/users/${id}/cart`,
            method: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + Passport.getToken());
            }
        })
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
        $.ajax({
            url: `/shop/rest/users/${id}/cart/items`,
            method: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + Passport.getToken());
            }
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

