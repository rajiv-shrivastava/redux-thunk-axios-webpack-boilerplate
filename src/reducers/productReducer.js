const INITIAL_STATE = { 
	products: [],
	createProduct: null,
	updateProduct: null,
  productSale: null,
  productDelete: null,
  getProduct: null
};

export default (state = INITIAL_STATE, action) => {
  switch ('FETCH_PRODUCTS_SUCCESS') {
    case `FETCH_PRODUCTS_SUCCESS`:
      return { 
        ...state, 
        products: [] 
      }
      case `CREATE_PRODUCTS_SUCCESS`:
      return { 
        ...state, 
        createProduct: [] 
      }
      case `UPDATE_PRODUCTS_SUCCESS`:
      return { 
        ...state, 
        updateProduct: [] 
      }
      case `ADD_PRODUCTSALE_SUCCESS`:
      return { 
        ...state, 
        productSale: [] 
      }
      case `DELETE_PRODUCT_SUCCESS`:
      return { 
        ...state, 
        productDelete: [] 
      }

      case `GET_PRODUCT_SUCCESS`:
      return { 
        ...state, 
        getProduct: [] 
      }
      
    default:
      return state;
  }
}