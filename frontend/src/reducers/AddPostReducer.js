/*AddPostReducer takes the state and an action as arguments for accessing and managing the global state of the application. */
const AddPostReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_POST':
            return {
                ...state,
                posts: state.posts.concat(action.payload)
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default AddPostReducer;