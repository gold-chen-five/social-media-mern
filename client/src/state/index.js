import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: []
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light"
        },
        setLogin: (state,action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        setLogout: (state) => {
            state.user = null
            state.token = null
        },
        setFriends: (state,action) => {
            if(state.user){
                state.user.friends = action.payload.friends
            }else{
                console.error("user friends non-existent")
            }
        },
        setPosts: (state,action) => {
            state.posts = action.payload.posts
        },
        setPost: (state,action) => {
            const updatedPosts = state.posts.map((post) => {
                if(post._id === action.payload.post._id) return action.payload.post
                return post
            })
            state.posts = updatedPosts
        },
        setPostLikes: (state,action) => {
            const updatedPosts = state.posts.map((post) => {
                if(post._id === action.payload.post._id){
                    const {likes, ...clone} = post
                    return {...clone, likes: action.payload.post.likes}
                }
                return post
            })
            state.posts = updatedPosts
        },
        setComments: (state,action) => {
            const updatedPosts = state.posts.map((post) => {
                if(post._id === action.payload.post._id){
                    const {comments, ...clone} = post
                    return {...clone, comments: action.payload.post.comments}
                }
                return post
            })
            state.posts = updatedPosts
        }
    }
})

export const {setMode, setFriends, setLogin, setLogout, setPosts, setPost, setPostLikes, setComments} = authSlice.actions

export default authSlice.reducer
