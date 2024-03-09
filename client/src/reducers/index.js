import { combineReducers } from "redux";
import posts from './posts'
import auth from './auth'
export default combineReducers({
  posts,
  auth
})

// reducers.js
/*import { combineReducers } from "redux";
import postsReducer from './posts'; // Import the posts reducer

export default combineReducers({
  posts: postsReducer, // Assign it to the 'posts' key in your combined reducer
});*/



