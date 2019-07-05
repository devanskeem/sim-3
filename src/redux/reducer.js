const initialState = {
    posts: [],
    username: '',
    id: '',
    imgurl: '',
}

const UPDATE_USER = 'UPDATE_USER'
const UPDATE_POSTS = 'UPDATE_POSTS'

export function updateUser(user = {}) {
    return {
        type: UPDATE_USER,
        payload: {
            username: user.username,
            id: user.id,
            imgurl: user.imgurl
        }
    }
}

export function updatePosts(posts = []) {
    return {
        type: UPDATE_POSTS,
        payload: posts
    }
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER:
            return {
                ...state,
                username: action.payload.username,
                id: action.payload.id,
                imgurl: action.payload.imgurl
            }
        case UPDATE_POSTS: 
            return {...state, posts: action.payload}
        default:
            return state;
    }
}

export default reducer