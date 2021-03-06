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
                <a class="dropdown-item" onClick="Controller.ShoppingCart.clicked(event)">Show Cart</a>
                <a class="dropdown-item" onClick="Controller.Purchase.clicked(event)">Purchase</a>
            </div>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" ariaexpanded="false">User&nbsp;</a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown01">
                <a class="dropdown-item" href="/shop/views/signin" onClick="go(event)">Sign In</a>
                <a class="dropdown-item" onClick="Controller.Signout.clicked(event)">Sign Out</a>
                <a class="dropdown-item" href="/shop/views/signup" onClick="go(event)">Sign Up</a>
                <a class="dropdown-item" onClick="Controller.Profile.clicked(event)">Profile</a>
            </div>
        </li>
    </ul>
</div>
</nav>`
);

Handlebars.registerPartial('header', `<header>
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
                        {{twoDecimals price}} €
                    </div>
                </div>
                <div class="col text-center">
                    <a onClick="Controller.ProductList.productClicked('{{_id}}', event)" class="btn btn-dark" style="padding: 10px 30px">Buy</a>
                </div>
            </div>
        </div>
    </p>
</div>
</div>
</div>`);

Handlebars.registerPartial('profile-basic', `
    <div class="sign-form">
        <label class="label-block">Name:        <b>{{name}}</b></label>
        <label class="label-block">Surname:     <b>{{surname}}</b></label>
        <label class="label-block">Birth date:  <b>{{dateFormat birth}}</b></label>
        <label class="label-block">Address:     <b>{{address}}</b></label>
        <label class="label-block">Email:       <b><i>{{email}}</i></b></label>
    </div>
`)
Handlebars.registerPartial('order-basic', `
    <div class="sign-form">
        <label class="label-block">Number:        {{number}}</label>
        <label class="label-block">Date:          {{dateFormat date}}</label>
        <label class="label-block">Name:          {{user.name}}</label>
        <label class="label-block">Surname:       {{user.surname}}</label>
        <label class="label-block">Address:       {{user.address}}</label>
        <label class="label-block">Card Holder:   {{cardHolder}}</label>
        <label class="label-block">Car Number:    {{cardNumber}}</label>
        <label class="label-block">Subtotal:      {{twoDecimals subtotal}} €</label>
        <label class="label-block">Tax:           {{twoDecimals tax}} €</label>
        <label class="label-block">Total:         {{twoDecimals total}} €</label>
    </div>
`)

Handlebars.registerPartial('item-list', `
<h2 style="text-align: center">Item List</h2>
<ul class="list-group">
    <li class="list-group-item">
        <div class="row">
            <div class="col-2">
                Qty
            </div>
            <div class="col-3">
                Product
            </div>
            <div class="col-2">
                Price
            </div>
            <div class="col-2" style="text-align: right">
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
            <div class="col-2">
                <b>{{qty}}</b>
            </div>
            <div class="col-3">
                <b>{{orderItemProduct.name}}</b>
            </div>
            <div class="col-2">
                <b>{{twoDecimals orderItemProduct.price}} €</b>
            </div>
            <div class="col-2" style="text-align: right">
                <b>{{twoDecimals total}} €</b>
            </div>
            <div class="col-3" style="text-align: right">
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Delete
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" onClick="Controller.ShoppingCart.decreaseItem('{{orderItemProduct._id}}', event)">Remove 1</a>
                        <a class="dropdown-item" onClick="Controller.ShoppingCart.removeItem('{{orderItemProduct._id}}', event)">Remove all</a>
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
        <div class="detail-box">
            <p id="subtotal">{{twoDecimals this.subtotal}} €</p>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-6 text-center">
        Tax
    </div>
    <div class="col-md-6 text-center">
        <div class="detail-box">
            <p id="tax">{{twoDecimals this.tax}} €</p>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-6 text-center">
        Total
    </div>
    <div class="col-md-6 text-center">
        <div class="detail-box">
            <p id="total"><b>{{twoDecimals this.total}} €</b></p>
        </div>
    </div>
</div>`);

Handlebars.registerPartial('showMessages', `
<div class="form-group" style="margin-top: 56px">
    {{#if hasMessages}}
        <ul class="list-group ">
            {{#each errors}}
                <li class="list-group-item list-group-item-danger text- left">{{message}}</li>
            {{/each}}
            {{#each infos}}
                <li class="list-group-item list-group-item-success text- left">{{message}}</li>
            {{/each}}
        </ul>
    {{/if}}
</div>
`
);

