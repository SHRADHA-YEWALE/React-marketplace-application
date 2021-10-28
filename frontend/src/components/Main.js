import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HomePage from './Home/Home.js';
import Product from './Product/ProductDetails.js';
import ProductDetails from './Post/Post.js';


class Main extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={HomePage} />
                <Route path="/product" component={Product} />
                <Route path="/addProduct" component={ProductDetails} />
            </div>
        );
    }
}
export default Main;