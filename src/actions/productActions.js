import api from './api';

export function fetchUsers() {
  console.log('api.get',api.get('users'))
  return {
    type: 'FETCH_PRODUCTS',
    payload: api.get('users'),
  };
}



