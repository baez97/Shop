Handlebars.registerPartial('navbar', `<nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
<a class="navbar-brand" href="/shop/views">{{logo}}</a>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" 
    aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse justify-content-end" id="navbarsExampleDefault">
    <ul class="navbar-nav">
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" ariaexpanded="false">Cart&nbsp;</a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown01">
                <a class="dropdown-item" href="#">{{button11}}</a>
                <a class="dropdown-item" href="#">{{button12}}</a>
            </div>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" ariaexpanded="false">User&nbsp;</a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown01">
                <a class="dropdown-item" href="#">{{button21}}</a>
                <a class="dropdown-item" href="#">{{button22}}</a>
                <a class="dropdown-item" href="#">{{button23}}</a>
                <a class="dropdown-item" href="#">{{button24}}</a>
            </div>
        </li>
    </ul>
</div>
</nav>`
);

Handlebars.registerPartial('header', `<header>
<p>Sports Shop</p>
<div class="jumbotron rounded-0 text-light">
    <div style="max-width: 1280px;" class="container">
        <div class="row">
            <div class="col-sm-12 text-center">
                <h1 class="display-3">Sports Shop Web Site</h1>
                <p>This is the best Sports Shop in the world. You can purchase any 
                    sport item that you want with the best prices in the market</p>
            </div>
        </div>
    </div>
</div>
</header>`
);

Handlebars.registerPartial('footer', `<footer class="bg-light fixed-bottom border-0">
<div class="container-fluid">
<div class="row">
<div class="col text-center text-dark pt-2">
<p><small>{{this}}</small></p>
</div>
</div>
</div>
</footer>`
);

Handlebars.registerPartial('card', `<div class="col-lg-4 col-md-6 col-sm-12" style="border: 0">
<div class="card text-white bg-primary mb-3" style="padding: 0px 10px; border-radius: 20px">
<img class="card-img-top" src="../images/Ball.png" alt="Card image cap">
<div class="card-body" style="padding: 0px 10px">
    <h4 class="card-title text-center">{{name}}</h4>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <p class="card-text">
        <div class="container">
            <div class="row">
                <div class="col text-center">
                    <div class="text-primary" style="padding: 5px; border-radius: 5px; background-color: white;  font-size: 20px">
                        {{price}} €
                    </div>
                </div>
                <div class="col text-center">
                    <a href="#" class="btn btn-dark" style="padding: 10px 30px">Comprar</a>
                </div>
            </div>
        </div>
    </p>
</div>
</div>
</div>`);
