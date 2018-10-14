window.addEventListener('popstate',
    function (event) {
        route();
    }, false);
$(function () {
    route();
});