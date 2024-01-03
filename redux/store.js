import { configureStore } from "@reduxjs/toolkit";
import warenkorbReducer from './warenkorbSlice';
import infoReducer from "./infoSlice";

export default configureStore({
    reducer:{
        warenkorb: warenkorbReducer,
        info: infoReducer,
    },
});