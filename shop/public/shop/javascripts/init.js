window.addEventListener('popstate',
    function (event) {
        route();
        preventDefault();
    }, false);
$(function () {
    route();
});