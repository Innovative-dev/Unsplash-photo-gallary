import {
    FETCH_STORIES_REQUEST,
    FETCH_STORIES_SUCCESS, FETCH_STORIES_FAIL
} from '../actions/types';

const initial_state = {
    loading: false,
    stories: [],
}
export default (state = initial_state, action) => {

    switch (action.type) {

        case FETCH_STORIES_REQUEST:
            return { ...state, loading: true, };

        case FETCH_STORIES_SUCCESS:
            return { ...state, loading: false, stories: action.payload }

        case FETCH_STORIES_FAIL:
            return { ...state, loading: false, stories: [] };

        default:
            return state;
    }

}