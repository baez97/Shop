Handlebars.registerPartial('navbar', `<nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
<a class="navbar-brand" href="/shop/views" onClick="go(event)">Sports Shop</a>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" 
    aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse justify-content-end" id="navbarsExampleDefault">
    <ul class="navbar-nav">
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" ariaexpanded="false">Cart&nbsp;</a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown01">
                <a class="dropdown-item" href="/shop/views/user/2/cart" onClick="go(event)">Show Cart</a>
                <a class="dropdown-item" href="/shop/views/user/2/purchase" onClick="go(event)">Purchase</a>
            </div>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" ariaexpanded="false">User&nbsp;</a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown01">
                <a class="dropdown-item" href="/shop/views/signin" onClick="go(event)">Sign In</a>
                <a class="dropdown-item" href="/shop/views" onClick="go(event)">Sign Out</a>
                <a class="dropdown-item" href="/shop/views/signup" onClick="go(event)">Sign Up</a>
                <a class="dropdown-item" href="/shop/views/user/1" onClick="go(event)">Profile</a>
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
            <p><small>SPA created by José Manuel for Web and Service Engineering subject 2018</small></p>
        </div>
    </div>
</div>
</footer>`
);

Handlebars.registerPartial('card', `<div class="col-lg-4 col-md-6 col-sm-12" style="border: 0">
<div class="card text-white bg-primary mb-3" style="padding: 0px 10px; border-radius: 20px; box-shadow: gray 0em 0.5em 2em;">
<img class="card-img-top" src="../../images/Ball.png"/>
<div class="card-body" style="padding: 0px 10px">
    <h4 class="card-title text-center" style="text-shadow: black 0em 0.2em 0.5em;">{{name}}</h4>
    <p class="card-text" style="text-shadow: black 0em 0.2em 0.5em;">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <p class="card-text">
        <div class="container">
            <div class="row">
                <div class="col text-center">
                    <div class="text-primary" style="padding: 5px; border-radius: 3px; background-color: white; font-size: 20px">
                        {{price}} €
                    </div>
                </div>
                <div class="col text-center">
                    <a id="{{_id}}" href="/shop/views/user/2/cart" onClick="addProduct('5be9e0625a3778086b0a1d0a', this.id, event)" class="btn btn-dark" style="padding: 10px 30px">Buy</a>
                </div>
            </div>
        </div>
    </p>
</div>
</div>
</div>`);

Handlebars.registerPartial('profile-basic', `
    <div class="sign-form">
        <label class="label-block">Name:        {{name}}</label>
        <label class="label-block">Surname:     {{surname}}</label>
        <label class="label-block">BirthDate:   {{birth}}</label>
        <label class="label-block">Address:     {{address}}</label>
        <label class="label-block">Email:       {{email}}</label>
    </div>
`)
Handlebars.registerPartial('order-basic', `
    <div class="sign-form">
        <label class="label-block">Number:        {{number}}</label>
        <label class="label-block">Date:          {{date}}</label>
        <label class="label-block">Name:          {{user.name}}</label>
        <label class="label-block">Surname:       {{user.surname}}</label>
        <label class="label-block">Address:       {{user.address}}</label>
        <label class="label-block">Card Holder:   {{cardHolder}}</label>
        <label class="label-block">Card Number:   {{cardNumber}}</label>
        <label class="label-block">Subtotal:      {{subtotal}}</label>
        <label class="label-block">Tax:           {{tax}}</label>
        <label class="label-block">Total:         {{total}}</label>
    </div>
`)

Handlebars.registerPartial('item-list', `
<h2 style="text-align: center">Item List</h2>
<ul class="list-group">
    <li class="list-group-item">
        <div class="row">
            <div class="col-3">
                Qty
            </div>
            <div class="col-3">
                Product
            </div>
            <div class="col-3" style="text-align: right">
                Total
            </div>
            <div class="col-3" style="text-align: right">
                Action
            </div>
        </div>
    </li>

    {{#each this}}
    <li class="list-group-item">
        <div class="row" hover="background-color: black">
            <div class="col-3">
                <b>{{qty}}</b>
            </div>
            <div class="col-3">
                <b>{{orderItemProduct.name}}</b>
            </div>
            <div class="col-3" style="text-align: right">
                <b>{{total}}€</b>
            </div>
            <div class="col-3" style="text-align: right">
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Delete
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#" onClick="go(event)">Remove 1</a>
                        <a class="dropdown-item" href="#" onClick="go(event)">Remove All</a>
                    </div>
                </div>
            </div>
        </div>
    </li>
    {{/each}}
</ul>
`)

Handlebars.registerPartial("total-detail-box", `
<div class="row">
    <div class="col-md-6 text-center">
        Subtotal
    </div>
    <div class="col-md-6 text-center">
        <div style="background-color: white; box-shadow: black 0em 0.1em 0.2em">
            <p id="subtotal">{{this.subtotal}}</p>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-6 text-center">
        Tax
    </div>
    <div class="col-md-6 text-center">
        <div style="background-color: white; box-shadow: black 0em 0.1em 0.2em">
            <p id="tax">{{this.tax}}</p>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-6 text-center">
        Total
    </div>
    <div class="col-md-6 text-center">
        <div style="background-color: white; box-shadow: black 0em 0.1em 0.2em">
            <p id="total"><b>{{this.total}}€</b></p>
        </div>
    </div>
</div>`)

