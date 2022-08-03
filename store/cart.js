import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// not working in server side rendering
// const cartItemsFromStorage = localStorage.getItem('cartItems') ?
//     JSON.parse(localStorage.getItem('cartItems'))
//     : []

const slice = createSlice({
  name: 'cartItems',
  initialState: { 
                  cartItems: [],
                  loading: false,
                  error: null
                },
  reducers: {
    setState: (state, action) =>  { return { ...state, cartItems: action.payload } } ,
    addItemStart: (state, action) => { state.loading = true, state.error = null } ,
    addItemSuccess: (state, action) => {
        const item = action.payload
        const existItem = state.cartItems.find((x) => x.product == item.product)
        if(existItem){
            return{
                ...state,
                cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x),
                loading: false,
                error: null,
            }
        } else {
            return {
                ...state,
                cartItems: [...state.cartItems, item],
                loading: false,
                error: null,
            }
        }
        
    },
    addItemFail:  (state, action) => { state.loading = false; state.error = action.payload},
    setError: (state, action) => { state.error = action.payload},
    actionStart: (state, action) => { state.loading = true, state.error = null } ,
    removeItem:  (state, action) => ({ ...state, cartItems: state.cartItems.filter(x => x.product !== action.payload) }) ,
  }
})

export default slice.reducer

const {setState, addItemStart, addItemSuccess, addItemFail, setError,  removeItem } = slice.actions

export const addToCart = (id, qty) => async (dispatch, getState) => {
  return new Promise( async (resolve, reject) => {
    if(!getState().cart.loading){
         try{
            await dispatch(addItemStart())
            const { data } = await axios.get(`http://localhost:5000/api/products/${id}`)
            await dispatch(addItemSuccess({
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }))
            if (typeof window !== 'undefined') {
                localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
            }
            
            resolve(true)
        }catch(error){
            await dispatch(addItemFail(error))
            reject(error)
        }
    }else{
        let error = new Error('Network is bussy, try again later.')
        await dispatch(setError(error))
        reject(error)
    }
       
  });
    
}

export const setCartItemsFromStorage = (id, qty) => async (dispatch, getState) => {
    if (typeof window !== 'undefined') {
        const cartItemsFromStorage = localStorage.getItem('cartItems') ?
            JSON.parse(localStorage.getItem('cartItems'))
            : []
        dispatch(setState(cartItemsFromStorage))
    }else{
        throw new Error('The window is not set yet.')
    }
    
}

export const removeFromCart = (id) => (dispatch, getState) => {
    if (typeof window !== 'undefined') {
        dispatch(removeItem(id))
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.acrtItems))
    }else{
        throw new Error('The window is not set yet.')
    }
    
}
