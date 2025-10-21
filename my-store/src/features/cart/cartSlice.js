import {createAction, createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import cartService from './cartService'
import{toast} from 'react-toastify'
const initState = {
isLoading:false,
isSuccess:false,
isError:false,
message:"",
cart:[],
isLoadingCart:false

}
export const createcart = createAsyncThunk('cart/save',async(data,thunkAPI)=>{
    try {
        return  await cartService.addToCart(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const cartDetails = createAsyncThunk('cart/details',async(id,thunkAPI)=>{
    try {
        return  await cartService.cart(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const deleteproductfromcart = createAsyncThunk('cart/delete-product',async(data,thunkAPI)=>{
    try {
        return  await cartService.deletefromcart(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const deletecart = createAsyncThunk('cart/delete',async(data,thunkAPI)=>{
    try {
        return  await cartService.deletecart(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const resetState = createAction('/resetallstate')
export const resetCartUuid = createAction('/resetCartUuid')

export const cartSlice = createSlice({
    name:'cart',
    reducers:{},
    initialState:initState,
    extraReducers:builder=>{
        builder.addCase(createcart.pending,(state)=>{
            state.isLoading = true
               state.isLoadingCart = true
        })
        .addCase(createcart.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.cart =  action.payload;
            console.log(action.payload)
            state.isError = false
               state.isLoadingCart = true
          
        })
        .addCase(createcart.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.response.data.error
         
        })
        .addCase(cartDetails.pending,(state)=>{
            state.isLoading = true
            state.isLoadingCart = true
        })
        .addCase(cartDetails.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.detailscart =  action.payload;
            console.log(action.payload)
            state.isError = false
             state.isLoadingCart = false
         
        })
        .addCase(cartDetails.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.error
         
        })
        .addCase(deleteproductfromcart.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteproductfromcart.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.detailscart =  action.payload.cart;
            console.log(action.payload)
            state.isError = false
           toast.warning(`${action.payload.removedItem.product.titre} supprimé`)
        })
        .addCase(deleteproductfromcart.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.error
         
        })
     .addCase(resetState,(state,action)=>{
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.cart= null
     })
     .addCase(resetCartUuid,(state,action)=>{
          state.isLoading = false
        state.isSuccess = false
        state.isError = true
       state.cart = []
     })
     .addCase(deletecart.pending,(state)=>{
        state.isLoading = true
    })
    .addCase(deletecart.fulfilled,(state,action)=>{
        state.isLoading = false
        state.isSuccess = true
        state.cart =  action.payload;
        console.log(action.payload)
        state.isError = false
      
    })
    .addCase(deletecart.rejected,(state,action)=>{
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload.error
     
    })
      
     
    }
})
export default cartSlice.reducer 