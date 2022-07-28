import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const slice = createSlice({
  name: 'productDestails',
  initialState: { 
                  contents: { reviews: [] },
                  loading: false,
                  error: null                  },
  reducers: {
    getProductDetailsStart: (state, action) => { state.loading = true } ,
    getProductDetailsSuccess: (state, action) => { state.loading = false; state.contents = action.payload},
    getProductDetailsFail:  (state, action) => { state.loading = false; state.error = action.payload}
  }
})

export default slice.reducer

const { getProductDetailsStart, getProductDetailsSuccess, getProductDetailsFail } = slice.actions

export const getProductDetails = (id) => async (dispatch) => {
  return new Promise( async (resolve, reject) => {
    try{
      dispatch(getProductDetailsStart())
      const { data } = await axios.get(`http://localhost:5000/api/products/${id}`)
      dispatch(getProductDetailsSuccess(data))
      resolve(data)
    }catch(error){
      dispatch(getProductDetailsFail(error))
      reject(error)
    }
  });
    
}
