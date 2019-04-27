import axios from '../../axios-api';
import {push} from 'connected-react-router';
import {NotificationManager} from "react-notifications";

export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_ERROR = 'CREATE_PRODUCT_ERROR';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_ERROR = 'DELETE_PRODUCT_ERROR';

export const fetchProductsSuccess = (products, category) => ({type: FETCH_PRODUCTS_SUCCESS, products, category});
export const fetchProductSuccess = (product) => ({type: FETCH_PRODUCT_SUCCESS, product});
export const createProductSuccess = () => ({type: CREATE_PRODUCT_SUCCESS});
export const createProductError = (error) => ({type: CREATE_PRODUCT_ERROR, error});
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
            response => {
              dispatch(fetchProductSuccess(response.data))
            }
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
                NotificationManager.success('You have successfully deleted product');
            },
            error => {
                dispatch(deleteProductError(error))
            }
        )
    }
};

export const createProduct = productData => {
  return (dispatch, getState) => {
      const token = getState().users.user.token;
      productData.append('user', getState().users.user._id);
      const config = {headers: {'Authorization': token}}
      return axios.post('/products', productData, config).then(
          () => {
            dispatch(createProductSuccess());
            dispatch(push('/'));
            NotificationManager.success('You have added new product');
          },
          error => {
              if (error.response) {
                  dispatch(createProductError(error.response.data));
              } else {
                  dispatch(createProductError({global: 'No connection'}));
              }
          }
    );
  };
};
