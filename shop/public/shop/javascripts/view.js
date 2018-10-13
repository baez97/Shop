function render(container, name, context) {
    var source = $("#" + name).html();
    console.log(name);
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
        footer: 'Handlebars and Bootstrap template'
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
// function renderPageNotFound() {
//     var context = {
//         header: { title: 'Post browser', subtitle: 'Page not found!' }, footer: 'Handlebars and Bootstrap template'
//     } 
//     render('contents', 'page-not-found-template', context);
// }
// function renderPost(id) {
//     var context = {
//         header: { title: 'Post', subtitle: 'Details' },
//         footer: 'Handlebars and Bootstrap template'
//     }
//     render('contents', 'home-page-template', context);
//     model.getPost(id, function (post) {
//         console.log('Retrieved post', post); //console.log('Context sent to home-page- template renderer', postList); 
//         render('main', 'post-template', post); 
//     });
// }