const INITIAL_STATE = { 
  users: [],
  usersLoading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `FETCH_PRODUCTS_PENDING`:
      return { 
        ...state, 
        usersLoading: true 
      }
    case `FETCH_PRODUCTS_FULFILLED`:
      return { 
        ...state, 
        users: action.payload.data,
        usersLoading: false

    }
    case `FETCH_PRODUCTS_REJECTED`:
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