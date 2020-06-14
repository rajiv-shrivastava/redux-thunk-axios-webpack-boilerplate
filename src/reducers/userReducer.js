const INITIAL_STATE = { 
  users: [],
  usersLoading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `FETCH_PRODUCTS_LOADING`:
      return { 
        ...state, 
        usersLoading: true 
      }
    case `FETCH_PRODUCTS_SUCCESS`:
      return { 
        ...state, 
        users: action.payload.data,
        usersLoading: false

    }
    case `FETCH_PRODUCTS_ERROR`:
      return { 
        ...state, 
        users: [],
        usersLoading: false,
        userError: 'Error in fetching users'
    }
      
    default:
      return state;
  }
}
