import React, {Component, Fragment} from 'react';
import {Container} from "reactstrap";
import {Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {NotificationContainer} from "react-notifications";

import {logoutUser} from "./store/actions/usersActions";

import Toolbar from "./components/UI/Toolbar/Toolbar";
import Products from "./containers/Products/Products";
import NewProduct from "./containers/NewProduct/NewProduct";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import './App.css'
import {fetchCategories} from "./store/actions/categoriesActions";
import {fetchProducts} from "./store/actions/productsActions";
import Product from "./containers/Product/Product";

class App extends Component {
    componentDidMount() {
      this.props.fetchCategories()
    }
    render() {
        return (
            <Fragment>
                <NotificationContainer/>
                <header>
                    <Toolbar
                        user={this.props.user}
                        logout={this.props.logoutUser}
                    />
                </header>
                <Container className='Main-container'>
                  <Sidebar categories={this.props.categories}
                           fetchProducts={this.props.fetchProducts}/>
                  <div className='Main-column'>
                    <Switch>
                        <Route path="/" exact component={Products}/>
                        <Route path="/products/new" exact component={NewProduct}/>
                        <Route path="/product/:id" exact component={Product}/>
                        <Route path="/register" exact component={Register}/>
                        <Route path="/login" exact component={Login}/>
                    </Switch>
                  </div>
                </Container>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    categories: state.categories.categories
});

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
    fetchCategories: () => dispatch(fetchCategories()),
    fetchProducts: (categoryId) => dispatch(fetchProducts(categoryId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
