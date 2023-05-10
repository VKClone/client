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

export interface FeedState {
    loadingPostsStatus: 'loading' | 'failed' | 'ok',
    posts: Post[],
}

const initialState: FeedState = {
    loadingPostsStatus: 'ok',
    posts: []
};


export const loadPosts = createAsyncThunk(
    'feed/loadPosts',
    async (data:{page: number}) => await fetch(baseURL + '/feed?' 
    + new URLSearchParams({
        page: data.page.toString()
    }))
    .then(response => {
        if (response.status !== 200) throw new Error('something wrong');
        return response.json();
    })
) 

export const feedSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearUser: () => initialState
    },
    extraReducers: (builder) => {
    builder
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

export const { clearUser } = feedSlice.actions;

export default feedSlice.reducer;