import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cartItems:  []
}

const cartSlice = createSlice({

    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if(!existingItem){
                state.cartItems.push(action.payload)
                alert("Item added")
            }else{
                alert("Item already exists")
            }
        }, 
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter (item => item._id !== action.payload._id)
        },
        clearCart: (state, action) => {
            state.cartItems = []
        }
    }
})          

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;