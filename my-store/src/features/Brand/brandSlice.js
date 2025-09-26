import {createAction, createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import  brandService from './brandService'

const initState = {
isLoading:false,
isSuccess:false,
isError:false,
message:"",
brands:[]

}
export const getbrands = createAsyncThunk('brand/get',async(thunkAPI)=>{
    try {
        return  await brandService.getAllBrands()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const resetState = createAction('/resetallstate')
export const brandSlice = createSlice({
    name:'brand',
    reducers:{},
    initialState:initState,
    extraReducers:builder=>{
        builder.addCase(getbrands.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getbrands.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.brands =  action.payload;
            console.log(action.payload)
            state.isError = false
          
        })
        .addCase(getbrands.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.error
         
        })
       
      
     
    }
})
export default brandSlice.reducer 