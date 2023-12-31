import {createSlice} from '@reduxjs/toolkit'

const warenkorbSlice = createSlice({
    name: "warenkorb",
    initialState:{
        produkte: [],
        gesamtbetrag: 0,
        wAnzahl: 0
    },
    reducers:{
        addProdukte: (state, action) =>{
            state.produkte.push(action.payload);
            state.wAnzahl += 1;
            state.gesamtbetrag += action.payload.preis * action.payload.menge;
            console.log(action.payload);
        },
        leeren: (state) =>{
            state.produkte = [];
            state.wAnzahl = 0;
            state.gesamtbetrag = 0;
            console.log('Warenkorb vollständig gelöscht');
        },
        loescheProdukt: (state, action) =>{
            const leftProdukte = state.produkte.filter((produkt) => produkt._id !== action.payload._id);
            state.produkte = leftProdukte;
            
            state.wAnzahl -= 1;
            state.gesamtbetrag -= action.payload.preis * action.payload.menge;
        },
    },
})

export const { loescheProdukt, addProdukte, leeren } = warenkorbSlice.actions;
export default warenkorbSlice.reducer;