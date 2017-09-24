import browser from 'bowser'
import {apiAction} from './requests'

export default function (state = {}, action = {}) {
  switch (action.type) {
    case 'POSTS_SUCCESS':
      return {
        ...state,
        posts: action.response,
        postsListError: null
      }
    case 'POSTS_REQUESTED':
      return {
        ...state,
        posts: [],
        postsListError: null
      }
    case 'POSTS_FAILED':
      return {
        ...state,
        posts: [],
        postsListError: action.error.toString()
      }
    
    default:
      return state
  }
}


export function fetchPosts () {
  return apiAction({
    types: ['POSTS_REQUESTED', 'POSTS_SUCCESS', 'POSTS_FAILED'],
    method: 'GET',
    path: `posts`
  })
}
