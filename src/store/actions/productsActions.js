import axios from '../../axios-api';
import {push} from 'connected-react-router';

export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_ERROR = 'DELETE_PRODUCT_ERROR';

export const fetchProductsSuccess = (products, category) => ({type: FETCH_PRODUCTS_SUCCESS, products, category});
export const fetchProductSuccess = (product) => ({type: FETCH_PRODUCT_SUCCESS, product});
export const createProductSuccess = () => ({type: CREATE_PRODUCT_SUCCESS});
export const deleteProductSuccess = () => ({type: DELETE_PRODUCT_SUCCESS});
export const deleteProductError = (error) => ({type: DELETE_PRODUCT_ERROR, error});

export const fetchProducts = (categoryId = null) => {
  let urlPath = '/products';
  if (categoryId) urlPath += '?category=' + categoryId;
  return dispatch => {
    return axios.get(urlPath).then(
      response => dispatch(fetchProductsSuccess(response.data.products, response.data.category))
    );
  };
};

export const fetchProduct = (productId) => {
    return dispatch => {
        return axios.get('/products/' + productId).then(
            response => dispatch(fetchProductSuccess(response.data))
        );
    };
};

export const deleteProduct = (productId) => {
    return (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};
        return axios.delete('/products/' + productId, config).then(
            () => {
                dispatch(deleteProductSuccess());
                dispatch(push('/'));
            },
            error => {
                dispatch(deleteProductError(error))
            }
        )
    }
}

export const createProduct = productData => {
  return (dispatch, getState) => {
      const token = getState().users.user.token;
      productData.append('user', getState().users.user._id);
      const config = {headers: {'Authorization': token}}
      return axios.post('/products', productData, config).then(
      () => dispatch(createProductSuccess())
    );
  };
};
