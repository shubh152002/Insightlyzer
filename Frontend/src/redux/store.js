import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import chartSlice from './chartSlice';

const store = configureStore({
    reducer:{
        // Add your reducers here
        auth: authSlice,
        chart:chartSlice,
    },
});

export default store;
