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

    // else if (m = p.match(/\/shop\/views\/product\/(\d*)$/g)) {
    //     m = m[m.length - 1].split('/');
    //     var id = m[m.length - 1];
    //     renderProduct(id);
    // }
    // else renderPageNotFound();
    console.log(location.href, 'routed')
}