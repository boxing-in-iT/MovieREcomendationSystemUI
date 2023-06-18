import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchWrapper } from '_helpers';

const name = 'favorites';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

export const favoritesActions = {...slice.actions, ...extraActions};
export const favoritesReducer = slice.reducer;

function createInitialState() {
    return {
        list: null,
        item: null,
        isFavorite: false,
        favs: {}
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/favorites`;

    return{
        addToFavorites:addToFavorites(),
        isFavorite:isFavorite(),
        getByUserId:getByUserId(),
        delete: _delete()
    }

    function addToFavorites(){
        return createAsyncThunk(
            `${name}/addToFavorites`,
             async ({ userId, movieId }) => await fetchWrapper.post(`${baseUrl}/addToFavorites`, { userId, movieId })
        )
    }

    function isFavorite(){
        return createAsyncThunk(
            `${name}/isFavorite`,
               async ({ userId, movieId }) => await fetchWrapper.get(`${baseUrl}/isFavorite?userId=${userId}&movieId=${movieId}`)
        )
    }

    function getByUserId(){
        return createAsyncThunk(
            `${name}/`,
            async(userId) =>await fetchWrapper.get(`${baseUrl}/${userId}`)
        )
    }

    function _delete() {
        return createAsyncThunk(
            `${name}/delete`,
            async ({userId,movieId}) => await fetchWrapper.delete(`${baseUrl}/${userId}/${movieId}`)
        );
    }
}

function createExtraReducers() {
    return {
        ...isFavorite(),
        ...getByUserId(),
        // ..._delete()
    };

    function isFavorite() {
        var { pending, fulfilled, rejected } = extraActions.isFavorite;
        return {
            [pending]: (state) => {
                state.isFavorite = { loading: false };
            },
            [fulfilled]: (state, action) => {
                state.isFavorite = action.payload;
            }
        };
    }

    function getByUserId(){
        var{pending, fulfilled, rejected} = extraActions.getByUserId;
        return {
            [pending]: (state) => {
                state.favs = { loading: false };
            },
            [fulfilled]: (state, action) => {
                state.favs = action.payload;
            },
            [rejected]: (state, action) => {
                state.favs = { error: action.error };
            }
        };
                
    }

    // function _delete() {
    //     var { pending, fulfilled, rejected } = extraActions.delete;
    //     return{
    //         [pending]:(state, action)=>{
    //             const user = state.list.value.find(x => x.id === action.meta.arg);
    //             user.isDeleting = true;
    //         },
    //         [fulfilled]: (state,action) => {
    //             state.list.value = state.list.value.filter(x => x.id !== action.meta.arg);
    //         },
    //         [rejected]: (state, action) => {
    //             const user = state.list.value.find(x => x.id === action.meta.arg);
    //             user.isDeleting = false;
    //         }
    //     }
        
    // }
}