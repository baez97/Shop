function render(container, name, context) {
    var source = $("#" + name).html();
    var template = Handlebars.compile(source); 
    var html = template(context);
    $('#' + container).html(html);
}
function renderHomePage() {
    render('contents', 'home-page-template', {});

    getProducts()
        .then( function (products) {
            render('main-header', 'product-list-template', products);
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
    
    getOrders('5be9e0625a3778086b0a1d0a')
        .then(function (user) {
            render('main-no-header', 'profile-template', user);
        });
}

function renderOrder(id_user, id_order) {
    render('contents', 'sign-template', {});
    
    getOrder('5be9e0625a3778086b0a1d0a', id_order)
        .then( function(order) {
            console.log(order);
            render('main-no-header', 'order-template', order);
        })
}

function renderShoppingCart(id) {
    render('contents', 'sign-template', {});
    
    getShoppingCart('5be9e0625a3778086b0a1d0a')
        .then(function(cart) {
            render('main-no-header', 'shopping-cart-template', cart);
        });
}

function renderPurchase(id) {
    render('contents', 'sign-template', {});
    
    getShoppingCart('5be9e0625a3778086b0a1d0a')
        .then(function(cart) {
            render('main-no-header', 'purchase-template', cart);
        });
}

function renderPageNotFound() {
    var context = {
        header: { title: 'Post browser', subtitle: 'Page not found!' }, footer: 'Handlebars and Bootstrap template'
    } 
    render('contents', 'page-not-found-template', context);
}