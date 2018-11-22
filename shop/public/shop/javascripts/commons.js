function go(event, url) {
    url = url ? url : event.target.href; 
    event.preventDefault();
    history.pushState(null, '', url);
    route();
}
function route() {
    var p = location.pathname;
    var m;
    if (p == "/shop/views/" || p == "/shop/views" ||  p == "/shop/views/products")
        renderHomePage();
    else if (p == "/shop/views/signin")
        renderSignIn();
    else if (p == "/shop/views/signup") {
        renderSignUp();
    }

    else if (m = p.match(/\/shop\/views\/user\/(\S*)\/cart$/g)) {
        m = m[m.length - 1].split('/');
        var id = m[m.length - 2];
        renderShoppingCart(id);
    }
    else if (m = p.match(/\/shop\/views\/user\/(\S*)\/purchase$/g)) {
        m = m[m.length - 1].split('/');
        var id = m[m.length - 2];
        renderPurchase(id);
    }
    else if (m = p.match(/\/shop\/views\/user\/(\S*)\/orders\/(\d*)$/g)) {
        m = m[m.length - 1].split('/');
        var n_order = m[m.length - 1];
        var id_user  = m[m.length - 3];
        renderOrder(id_user, n_order);
    }
    else if (m = p.match(/\/shop\/views\/user\/(\S*)$/g)) {
        m = m[m.length - 1].split('/');
        var id = m[m.length - 1];
        renderUser(id);
    }
    else renderPageNotFound();
 }