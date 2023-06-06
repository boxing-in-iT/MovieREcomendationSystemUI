import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchWrapper } from '../_helpers';

// create slice

const name = 'users';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const userActions = { ...slice.actions, ...extraActions };
export const usersReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        users: {}
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

    return {
        register: register(),
        getAll: getAll()
    }; 

    function register(user) {
        return createAsyncThunk(`${name}/register`, async (user) => {
          try {
            const response = await fetchWrapper.post(`${baseUrl}/register`, user);
            if (response.ok) {
              const data = await response.json();
              return data; // Return the response data if needed
            } else {
              const errorMessage = await response.text();
              throw new Error(errorMessage); // Handle the error if needed
            }
          } catch (error) {
            throw new Error('Registration failed'); // Handle the error if needed
          }
        });
      }
    
    // function register(user) {
    //     return createAsyncThunk(`${name}/register`, async (user) => {
    //       try {
    //         const response = await fetchWrapper.post(`${baseUrl}/register`, user);
    //         return response.data; // Return the response data if needed
    //       } catch (error) {
    //         throw new Error('Registration failed'); // Handle the error if needed
    //       }
    //     });
    //   }

    function getAll() {
        return createAsyncThunk(
            `${name}/getAll`,
            async () => await fetchWrapper.get(baseUrl)
        );
    }
}

function createExtraReducers() {
    return {
        ...getAll()
    };

    function getAll() {
        var { pending, fulfilled, rejected } = extraActions.getAll;
        return {
            [pending]: (state) => {
                state.users = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.users = action.payload;
            },
            [rejected]: (state, action) => {
                state.users = { error: action.error };
            }
        };
    }
}
