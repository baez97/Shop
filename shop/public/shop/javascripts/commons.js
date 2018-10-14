function go(event, url) {
    url = url ? url : event.target.href; 
    event.preventDefault();
    history.pushState(null, '', url);
    route();
}
function route() {
    // console.log('Routing', location.href); 
    // console.log('REMEMBER to change this!'); 
    // console.log('Pathname', location.pathname);
    
    var p = location.pathname;
    var m;
    if (p == "/shop/views/" || p == "/shop/views" ||  p == "/shop/views/products")
        renderHomePage();
    else if (p == "/shop/views/signin")
        renderSignIn();
    else if (p == "/shop/views/signup") {
        renderSignUp();
    }
    else if (m = p.match(/\/shop\/views\/user\/(\d*)$/g)) {
        m = m[m.length - 1].split('/');
        var id = m[m.length - 1];
        renderUser(id);
    }
    else renderPageNotFound();
 }