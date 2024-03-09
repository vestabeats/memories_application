import { FETCH_ALL,FETCH_POST, DELETE, LIKE, UPDATE, CREATE, FETCH_BY_SEARCH,START_LOADING,END_LOADING,COMMENT } from '../constants/actionTypes';

const initialState = {
  isLoading:true,
  posts: [], // This is now an array
  currentPage: 1,
  numberOfPages: 1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return {...state, isLoading:true}
    case END_LOADING:
        return {...state, isLoading:false}
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
      return {
        ...state,
        posts: action.payload,
      };
      case FETCH_POST:
        return {
          ...state,
          post: action.payload.data,
        };
    case CREATE:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case UPDATE:
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)),
      };
      case COMMENT:
        return {
          ...state,
          posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)),
        };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};
