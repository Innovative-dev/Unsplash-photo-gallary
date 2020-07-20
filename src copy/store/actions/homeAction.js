import axios from 'axios';
import {
    FETCH_STORIES_REQUEST,
    FETCH_STORIES_SUCCESS, FETCH_STORIES_FAIL
} from './types';

export const baseUrl = 'https://hacker-news.firebaseio.com/v0/';
export const newStoriesUrl = `${baseUrl}newstories.json`;
export const storyUrl = `${baseUrl}item/`;




export const fetchStories = () => {
    return dispatch => {
        dispatch({ type: FETCH_STORIES_REQUEST });
        let allStories = [];
        axios.get(newStoriesUrl)
            .then(response => {
                let promises = [];
                const data = response.data;
                data.forEach(storyId => {
                    promises.push(
                        axios.get(`${storyUrl + storyId}.json`)
                            .then(response => {
                                allStories.push(response.data);
                            })
                    )
                })
                return Promise.all(promises)
            }).then(() => {
                dispatch({ type: FETCH_STORIES_SUCCESS, payload: allStories });
            })
            .catch(error => {
                dispatch({ type: FETCH_STORIES_FAIL, payload: null })
            })
    }
}
