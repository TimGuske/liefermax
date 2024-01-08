import { configureStore } from "@reduxjs/toolkit";
import warenkorbReducer from './warenkorbSlice';
import infoReducerIn from "./infoSlice";

export default configureStore({
    reducer:{
        warenkorb: warenkorbReducer,
        info: infoReducerIn,
    },
});