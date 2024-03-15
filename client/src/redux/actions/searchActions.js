
import axios from 'axios';
import { setLoading, setError, setSearchResults } from '../slices/search';

export const searchProducts = (query) => async (dispatch) => {
    dispatch(setLoading());
    try {
      const { data } = await axios.get(`/api/search?t=${query}`);
      dispatch(setSearchResults(data));
      console.log(data)
    } catch (error) {
      dispatch(
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : 'An expected error has occurred. Please try again later.'
        )
      );
    }
  };


  export const searchAutoCompleteProducts = (query) => async (dispatch) => {
    dispatch(setLoading());
    try {
      const { data } = await axios.get(`/api/autocomplete?t=${query}`);
      dispatch(setSearchResults(data));
      console.log(data)
    } catch (error) {
      dispatch(
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : 'An expected error has occurred. Please try again later.'
        )
      );
    }
  };
  
  