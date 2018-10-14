function render(container, name, context) {
    var source = $("#" + name).html();
    var template = Handlebars.compile(source); 
    var html = template(context);
    $('#' + container).html(html);
}
function renderHomePage() {
    var context = {
        navbar: { 
            logo       : 'Sports Shop',
            button11   : 'Show Cart', 
            button12   : 'Purchase', 
            button21   : 'Sign In', 
            button22   : 'Sing Out', 
            button23   : 'Sign Up', 
            button24   : 'Profile', 
        },
        header: {
            title       : 'Sports Shop Website',
            description : 'This is the best Sports Shop in the world. You can purchase any' +
                          ' sport item that you want with the best prices in the market'
        },
        footer: 'SPA created by José Manuel for Web and Service Engineering subject 2018'
    };
    render('contents', 'home-page-template', context);

    model.getProducts(function(products) {
        var productList = { products: products };
        render('main', 'product-list-template', productList);
    });

    // model.getPostList(function (posts) {
    //     var postList = { posts: posts };
    //     render('main', 'post-list-template', postList);
    // });
}

function renderSignIn() {
    var context = {
        navbar: { 
            logo       : 'Sports Shop',
            button11   : 'Show Cart', 
            button12   : 'Purchase', 
            button21   : 'Sign In', 
            button22   : 'Sing Out', 
            button23   : 'Sign Up', 
            button24   : 'Profile', 
        },
        footer: 'SPA created by José Manuel for Web and Service Engineering subject 2018'
    };
    console.log("Rendering sign-in");
    render('contents', 'sign-template', context);
    render('main-sign', 'sign-in-template', {});
}

function renderSignUp() {
    var context = {
        navbar: { 
            logo       : 'Sports Shop',
            button11   : 'Show Cart', 
            button12   : 'Purchase', 
            button21   : 'Sign In', 
            button22   : 'Sing Out', 
            button23   : 'Sign Up', 
            button24   : 'Profile', 
        },
        footer: 'SPA created by José Manuel for Web and Service Engineering subject 2018'
    };
    render('contents', 'sign-template', context);
    render('main-sign', 'sign-up-template', {});
}

function renderShoppingCart() {
    var context = {
        navbar: { 
            logo       : 'Sports Shop',
            button11   : 'Show Cart', 
            button12   : 'Purchase', 
            button21   : 'Sign In', 
            button22   : 'Sing Out', 
            button23   : 'Sign Up', 
            button24   : 'Profile', 
        },
        footer: 'SPA created by José Manuel for Web and Service Engineering subject 2018',
        shopping: 'asdf'
    };
    render('contents', 'sign-template', context);
    render('main-sign', 'shopping-cart-template', {});
}
// function renderPageNotFound() {
//     var context = {
//         header: { title: 'Post browser', subtitle: 'Page not found!' }, footer: 'Handlebars and Bootstrap template'
//     } 
//     render('contents', 'page-not-found-template', context);
// }

function renderUser(id) {
    var context = {
        navbar: { 
            logo       : 'Sports Shop',
            button11   : 'Show Cart', 
            button12   : 'Purchase', 
            button21   : 'Sign In', 
            button22   : 'Sing Out', 
            button23   : 'Sign Up', 
            button24   : 'Profile', 
        },
        footer: 'SPA created by José Manuel for Web and Service Engineering subject 2018'
    };

    render('contents', 'sign-template', context);

    model.getUser(id, function (user) {
        console.log('Retrieved user', user);
        var userList = { user: user}
        render('main-sign', 'profile-template', userList); 
    });
}