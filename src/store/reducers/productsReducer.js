import {
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCT_SUCCESS,
    DELETE_PRODUCT_ERROR
} from "../actions/productsActions";

const initialState = {
  products: [],
  category: null,
  product: null,
  deleteError: null
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {...state, products: action.products, category: action.category};
    case FETCH_PRODUCT_SUCCESS:
          return {...state, product: action.product};
    case DELETE_PRODUCT_ERROR:
          return {...state, deleteError: action.error};
    default:
      return state;
  }
};

export default productsReducer;
