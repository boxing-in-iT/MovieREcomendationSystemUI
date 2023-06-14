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
        isFavorite: false
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/favorites`;

    return{
        addToFavorites:addToFavorites(),
        isFavorite:isFavorite(),
        getByUserId:getByUserId()
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
            `${name}`,
            async(id) =>await fetchWrapper.get(`${baseUrl}/${id}`)
        )
    }
}

function createExtraReducers() {
    return {
        ...isFavorite()
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
}

// function createExtraReducers() {
//     return {
//         // ... остальные обработчики

//         [isFavorite.pending]: (state) => {
//             state.isFavorite = false; // Устанавливаем значение isFavorite в false перед загрузкой
//         },
//         [isFavorite.fulfilled]: (state, action) => {
//             state.isFavorite = action.payload; // Устанавливаем значение isFavorite на основе полученных данных
//         }
//     };
// }


    

    // return {
    //     addToFavorites: createAsyncThunk(
    //         `${name}/addToFavorites`,
    //         async ({ userId, movieId }) => await fetchWrapper.post(`${baseUrl}/addToFavorites`, { userId, movieId })
    //     ),
    //     isFavorite: createAsyncThunk(
    //         `${name}/isFavorite`,
    //         async ({ userId, movieId }) => await fetchWrapper.get(`${baseUrl}/isFavorite?userId=${userId}&movieId=${movieId}`)
    //     )
    // };



// function createExtraReducers() {
//     return {
//         ...isFavorite()
//     };

//     function isFavorite() {
//         var { pending, fulfilled, rejected } = extraActions.isFavorite;
//         return {
//             [pending]: (state) => {
//                 state.isFavorite = { loading: false };
//             },
//             [fulfilled]: (state, action) => {
//                 state.isFavorite = action.payload;
//             }
//         };
//     }
// }