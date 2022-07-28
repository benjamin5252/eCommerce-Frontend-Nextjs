import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const slice = createSlice({
  name: 'productList',
  initialState: { 
                  products: [],
                  loading: false,
                  error: null                  },
  reducers: {
    listProductsStart: (state, action) => { state.loading = true } ,
    listProductsSuccess: (state, action) => { state.loading = false; state.products = action.payload},
    listProductsFail:  (state, action) => { state.loading = false; state.error = action.payload}
  }
})

export default slice.reducer

const { listProductsStart, listProductsSuccess, listProductsFail } = slice.actions

export const listProducts = () => async (dispatch) => {
  return new Promise( async (resolve, reject) => {
    try{
      dispatch(listProductsStart())
      const { data } = await axios.get('http://localhost:5000/api/products')
      dispatch(listProductsSuccess(data))
      resolve(data)
    }catch(error){
      dispatch(listProductsFail(error))
      reject(error)
    }
  });
    
}


