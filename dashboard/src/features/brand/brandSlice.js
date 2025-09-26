import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import brandsService from './brandService'
import {toast} from 'react-toastify'
const initState = {
isLoading:false,
isSuccess:false,
isError:false,
message:"",
brands:[]

}
export const createbrand = createAsyncThunk('brand/save',async(data,thunkAPI)=>{
    try {
        return  await brandsService.createbrand(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const brandSlice = createSlice({
    name:'brand',
    reducers:{},
    initialState:initState,
    extraReducers:builder=>{
        builder.addCase(createbrand.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createbrand.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.brands = [...state.brands, action.payload];
            console.log(action.payload)
            state.isError = false
            toast.success('brand creer avec succees')
        })
        .addCase(createbrand.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.response.data.message
            toast.error(action.payload.response.data.message)
        })
     
     
    }
})
export default brandSlice.reducer 