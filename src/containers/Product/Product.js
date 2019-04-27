import React, {Component} from 'react';
import ProductThumbnail from "../../components/ProductThumbnail/ProductThumbnail";
import {deleteProduct, fetchProduct} from "../../store/actions/productsActions";
import {connect} from "react-redux";
import {Button} from "reactstrap";

class Product extends Component {

    componentDidMount() {
        this.props.fetchProduct(this.props.match.params.id);
    }

    renderDeleteBtn = () => {
        if (this.props.user && this.props.user._id === this.props.product.user._id) {
            return <Button type="button"
                           onClick={() => this.props.deleteProduct(this.props.product._id)}>Delete</Button>
        }
    }

    render() {
        const { product } = this.props;
        const renderProduct = product => (
            <div>
                <ProductThumbnail image={product.image}/>
                <div><b>Title:</b> {product.title}</div>
                <div><b>Description:</b> {product.description}</div>
                <div><b>Price:</b> {product.price} USD</div>
                <div><b>Category:</b> {product.category.title}</div>
                <div><b>Seller:</b> {product.user.displayName} - {product.user.phone}</div>
                { this.renderDeleteBtn() }
            </div>
        );


        return (
            <div>
                { product && renderProduct(product) }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    product: state.products.product,
    user: state.users.user
});

const mapDispatchToProps = dispatch => ({
    fetchProduct: (productId) => dispatch(fetchProduct(productId)),
    deleteProduct: (productId) => dispatch(deleteProduct(productId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
