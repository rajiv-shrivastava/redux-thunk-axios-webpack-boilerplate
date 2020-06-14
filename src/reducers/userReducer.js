const INITIAL_STATE = { 
  users: [],
  usersLoading: false
};

export default (state = INITIAL_STATE, action) => {
  console.log('222222222222222222222',action.payload ? action.payload.data : '')
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
      
    default:
      return state;
  }
}