import * as api from '../api' 
import { AUTH } from '../constants/actionTypes'
export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    if (data) {
      dispatch({ type: AUTH, data });
      navigate('/');
      return data; 
    } else {
      return null; 
    }
  } catch (error) {
    console.log(error);
    return null; 
  }
};

export const signup = (formData, navigate) =>async(dispatch)=>{
  try {
    const { data } = await api.signUp(formData);
    
    if (data) {
      dispatch({ type: AUTH, data });
      navigate('/');
      return data; 
    } else {
      return null; 
    }
  } catch (error) {
    console.log(error);
    return null; 
  }
};