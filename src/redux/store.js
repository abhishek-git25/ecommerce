import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import {productReducer} from "./productReducer"
import {cartReducer} from "./cartReducer"


export const store = configureStore({
    reducer : {
        productReducer,
        cartReducer,
    },
    middleware : [...getDefaultMiddleware() ]
})