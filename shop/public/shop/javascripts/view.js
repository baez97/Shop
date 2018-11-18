var passUserId = '5bebdf1765818e097c721ed3';

function render(container, name, context) {
    var source = $("#" + name).html();
    var template = Handlebars.compile(source); 
    var html = template(context);
    $('#' + container).html(html);
}
// function renderHomePage() {
//     Passport.profile()
//     render('contents', 'home-page-template', {});

//     getProducts()
//         .then(function (products) {
//             render('main-header', 'product-list-template', products);
//         });
// }

// function renderSignIn() {
//     render('contents', 'sign-template', {});
//     render('main-no-header', 'sign-in-template', {});
// }

// function renderSignUp() {
//     render('contents', 'sign-template', {});
//     render('main-no-header', 'sign-up-template', {});
// }

function renderHomePage() {
    var context = Messages.all(); 
    console.log(context);
    context.hasMessages = context.errors.length | context.infos.length;
    render('contents', 'home-page-template', context);
    getProducts()
        .then( (products) => {
            render('main-header', 'product-list-template', products);
        })
        .catch( (error) => {
            Messages.error(error);
        });
}

function renderSignIn() {
    var context = Messages.all(); 
    context.hasMessages = context.errors.length | context.infos.length;
    context.user = Controller.SigninForm.getUser(); 
    render('contents', 'sign-template', context); 
    render('main-no-header', 'sign-in-template', context);
}

function renderSignUp() {
    var context = Messages.all(); 
    context.hasMessages = context.errors.length | context.infos.length;
    context.user = Controller.SignupForm.getUser(); // console.log('Signup', context); 
    render('contents', 'sign-template', context); 
    render('main-no-header', 'sign-up-template', context);
}

function renderUser() {
    Passport.profile()
        .done( (result) => {
            var context = Messages.all(); 
            context.hasMessages = context.errors.length | context.infos.length;
            render('contents', 'sign-template', context);   

            modelProxy.getOrders(result._id)
            .then(function(user) {
                let dateString = user.birth.slice(0,10);
                let profileContext = {user: user, dateString: dateString};
                render('main-no-header', 'profile-template', profileContext);
            })
            .catch( error => {
                Messages.error(error.responseText);
            })
        })
        .fail( (error) => {
            Messages.error("Not Logged in");
            go(event, `/shop/views`);
        })
}

function renderOrder(id_user, n_order) {
    console.log(`${n_order}, ${id_user}`);
    Passport.profile()
        .done( (result) => {
            var context = Messages.all(); 
            context.hasMessages = context.errors.length | context.infos.length;
            render('contents', 'sign-template', context);   
    
            Controller.Order.getOrder(n_order)
            .then( order => {
                render('main-no-header', 'order-template', order);
            })
            .catch( error => {
                Messages.error(error.responseText);
            })
        })
        .fail( (error) => {
            Messages.error("Not Logged in");
            go(event, `/shop/views`);
        })       
}

function renderShoppingCart(id) {
    Passport.profile()
        .done( (result) => {
            var context = Messages.all(); 
            context.hasMessages = context.errors.length | context.infos.length;
            render('contents', 'sign-template', context);            
            Controller.ShoppingCart.loadCart()
                .then(cart => {
                    render('main-no-header', 'shopping-cart-template', cart);
                })
        }).fail(function (err) { 
            Messages.error(err.responseText);
            var context = Messages.all(); 
            context.hasMessages = context.errors.length | context.errors.infos;
            render('contents', 'home-page-template', context); 
        })
    
}

function renderPurchase(id) {
    Passport.profile()
        .done( (result) => {
            var context = Messages.all(); 
            context.hasMessages = context.errors.length | context.infos.length;
            render('contents', 'sign-template', context);

            var date = new Date();
            Controller.ShoppingCart.loadCart()
                .then( (cart) => {
                    console.log(cart);   
                    var purchaseContext = {
                        cart: cart,
                        dateString: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
                        date: date
                    }
                    console.log(purchaseContext);
                    render('main-no-header', 'purchase-template', purchaseContext);
                })
                .catch( error => {
                    Messages.error(error.responseText);
                })
        })
}

function renderPageNotFound() {
    var context = {
        header: { title: 'Post browser', subtitle: 'Page not found!' }, footer: 'Handlebars and Bootstrap template'
    } 
    render('contents', 'page-not-found-template', context);
}

function addProductClicked(pid, event) {
    Passport.profile()
        .then(result => {
            var uid = result._id;
            addProduct(uid, pid, event);
        })
}