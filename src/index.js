import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Homepage from './views/Homepage';
import Contact from './views/Contact';
import Products from './views/Products';
import ProductSingle from './views/ProductSingle';
import ProductsSearched from './views/ProductsSearched';
import ErrorPage from './views/ErrorPage';


import './index.css';


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={Homepage} />
            <Route path="/contact" exact={true} component={Contact} />
            <Route path="/products" exact={true} component={Products} />
            <Route path="/products/:productId" exact={true} component={ProductSingle} />
            <Route path="/products/find/:productName" exact={true} component={ProductsSearched} />
            <Route path="/404" exact={true} component={ErrorPage} />
        </Switch>
    </BrowserRouter>

    , document.getElementById('root'));