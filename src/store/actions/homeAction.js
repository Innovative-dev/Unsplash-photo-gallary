import axios from 'axios';
import {
    FETCH_STORIES_REQUEST,
    FETCH_STORIES_SUCCESS, FETCH_STORIES_FAIL
} from './types';


export const baseUrl = 'https://api.unsplash.com';

const headers = {
    Authorization: 'Client-ID Oj0IyULt5DTWnkEMPXLunJT7WuZfTpgWGZbmoyPizMk',
    "Content-Type": "application/json"
  }

export const fetchStories = (query) => {
    const params = query ? `/search/photos?query=${query}` : '/photos';

    return dispatch => {
        dispatch({ type: FETCH_STORIES_REQUEST });
        axios.get(`${baseUrl}${params}`,{
            headers: headers
          })
            .then((response) => {
                if(query){
                    dispatch({ type: FETCH_STORIES_SUCCESS, payload: response?.data?.results });
                } else{
                    dispatch({ type: FETCH_STORIES_SUCCESS, payload: response?.data });
                }
                
            })
            .catch(error => {
                dispatch({ type: FETCH_STORIES_FAIL, payload: null })
            })
    }
}
