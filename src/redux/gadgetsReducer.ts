import { CartItem } from "@/models/CartItem";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GadgetState = {
    cart: CartItem[],

}
const initialState: GadgetState = {
    cart: [],

}
export type GadgetAction = {
    type: string;
    payload?: CartItem;
}
//action: {type: "addtocart", payload: CartItem}
//action: {type: "removeitem", id: 1}
// export const gadgetsReducer = (state=initialState, action) => {

//     if(action.type === "addtocart" && action.payload){

//     //     //state.cart.push(action.payload);
//         const cart = [...state.cart];
//         cart.push(action.payload);
//         return {
//             ...state,
//             cart: cart,
//         }
//     }
//     return state;
// }

const gadgetsSlice = createSlice({
    name: "gadgetsSlice",
    initialState: initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const index: number = state.cart.findIndex(item => item.product.id === action.payload.product.id);
            if (index === -1)
                state.cart.push(action.payload);
            else
                state.cart[index].quantity += action.payload.quantity;
        },
        removeCartItem: (state, action: PayloadAction<number>) => {
            const index: number = state.cart.findIndex(item => item.product.id === action.payload);
            state.cart[index].quantity -= 1;
            if (state.cart[index].quantity <= 0)
                state.cart.splice(index, 1);
        }
    }
})

export const { addToCart, removeCartItem } = gadgetsSlice.actions;
export const gadgetsReducer = gadgetsSlice.reducer;
