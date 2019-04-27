import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

import ProductForm from "../../components/ProductForm/ProductForm";
import {createProduct} from "../../store/actions/productsActions";
import {fetchCategories} from "../../store/actions/categoriesActions";

class NewProduct extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  createProduct = productData => {
    this.props.onProductCreated(productData)
  };

  render() {
    return (
      <Fragment>
        <h2>New product</h2>
        <ProductForm
          onSubmit={this.createProduct}
          categories={this.props.categories}
          error={this.props.createError}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categories,
  createError: state.products.createError
});

const mapDispatchToProps = dispatch => ({
  onProductCreated: productData => dispatch(createProduct(productData)),
  fetchCategories: () => dispatch(fetchCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);
