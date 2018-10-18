function render(container, name, context) {
    var source = $("#" + name).html();
    var template = Handlebars.compile(source); 
    var html = template(context);
    $('#' + container).html(html);
}
function renderHomePage() {
    render('contents', 'home-page-template', {});

    model.getProducts(function(products) {
        var productList = { products: products };
        render('main-header', 'product-list-template', productList);
    });
}

function renderSignIn() {
    render('contents', 'sign-template', {});
    render('main-no-header', 'sign-in-template', {});
}

function renderSignUp() {
    render('contents', 'sign-template', {});
    render('main-no-header', 'sign-up-template', {});
}

function renderShoppingCart() {
    render('contents', 'sign-template', {});
    render('main-no-header', 'shopping-cart-template', {});
}

function renderUser(id) {
    render('contents', 'sign-template', {});
    
    model.getUser(id, function (user) {
        console.log('Retrieved user', user);
        var userList = { user: user}
        render('main-no-header', 'profile-template', userList); 
    });
}

function renderOrder(id_user, id_order) {
    render('contents', 'sign-template', {});
    
    model.getUser(id_user, function(user) {
        res = {
            user: user,
            order: user.userOrders[id_order]
        }
        
        render('main-no-header', 'order-template', res);
    })
}

function renderShoppingCart(id) {
    render('contents', 'sign-template', {});
    
    model.getUser(id, function(user) {
        res = {
            cart: user.shoppingCart
        }
        console.log(res);
        render('main-no-header', 'shopping-cart-template', res);
    })
}

function renderPurchase(id) {
    render('contents', 'sign-template', {});
    
    model.getUser(id, function(user) {
        res = {
            cart: user.shoppingCart
        }
        console.log(res);
        render('main-no-header', 'purchase-template', res);
    })
}

function renderPageNotFound() {
    var context = {
        header: { title: 'Post browser', subtitle: 'Page not found!' }, footer: 'Handlebars and Bootstrap template'
    } 
    render('contents', 'page-not-found-template', context);
}