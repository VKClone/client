import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import { baseURL } from '../../config';

import { userData } from './auth';

export type Post = {
    authorUID: string,
    authorFirstName: string,
    authorLastName: string,
    authorImg?: string,
    date: string,
    imgUrl?: string,
    text?: string
}

export interface UserPageState {
    isMe:boolean
    userDataStatus?: 'loading' | 'failed' | 'ok',
    loadingPostsStatus: 'loading' | 'failed' | 'ok',
    postingStatus?: 'loading' | 'failed' | 'ok',
    posts: Post[],
    pagesCnt: number,
    userData: userData | null
}

const initialState: UserPageState = {
    isMe: false,
    pagesCnt: 0,
    loadingPostsStatus: 'ok',
    posts: [],
    userData: null
};

export const getUserData = createAsyncThunk(
    'userpage/getUserData',
    async (data:{uid:string, jwt:string}) => await fetch(baseURL + '/user?' 
    + new URLSearchParams({
        uid: data.uid.toString()
    }), {
        headers: {
            'Authorization': 'Bearer '+ data.jwt
        }
    })
    .then(response => {
        if (response.status !== 200) throw new Error('something wrong');
        return response.json();
    })
    .catch(error => console.error(error))
)


export const post = createAsyncThunk(
    'userpage/post',
    async (data:string) => fetch(baseURL + '/post', {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
)

export const loadPosts = createAsyncThunk(
    'userpage/loadPosts',
    async (data:{uid:string, jwt:string, page: number}) => await fetch(baseURL + '/userposts?' 
    + new URLSearchParams({
        uid: data.uid,
        page: data.page.toString()
    }), {
        headers: {
            'Authorization': 'Bearer '+ data.jwt
        }
    })
    .then(response => {
        if (response.status !== 200) throw new Error('something wrong');
        return response.json();
    })
    // .catch(error => console.error(error))
) 

export const userpageSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearUser: () => initialState
    },
    extraReducers: (builder) => {
    builder
        .addCase(getUserData.pending, (state) => { state.userDataStatus = 'loading'; })
        .addCase(getUserData.fulfilled, (state, action) => {
            state.userDataStatus = 'ok';
            state.userData = action.payload
        })
        .addCase(getUserData.rejected, (state) => { state.userDataStatus = 'failed'; })
        .addCase(post.pending, (state) => { state.postingStatus = 'loading'; })
        .addCase(post.fulfilled, (state, action) => {
            state.postingStatus = 'ok';
            state.posts.unshift(action.payload)
        })
        .addCase(post.rejected, (state) => { state.postingStatus = 'failed'; })
        .addCase(loadPosts.pending, (state) => { state.loadingPostsStatus = 'loading'; })
        .addCase(loadPosts.fulfilled, (state, action) => {
            state.loadingPostsStatus = 'ok';
            console.log(action.payload)
            action.payload.forEach((p:any) => {
                state.posts.push({
                    // @ts-ignore
                    pid: p.pid.toString(),
                    authorUID: p.uid,
                    authorFirstName: p.first_name,
                    authorLastName: p.last_name,
                    authorImg: p.img_url,
                    date: p.date,
                    imgUrl: p.imgUrl,
                    text: p.content,
                    isLiked: false,
                    likesCnt: 0
                })
            });
        })
        .addCase(loadPosts.rejected, (state) => { state.loadingPostsStatus = 'failed'; });
    },
});

export const { clearUser } = userpageSlice.actions;

export default userpageSlice.reducer;