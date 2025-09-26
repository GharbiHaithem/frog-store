import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import productService from './productService'
import {toast} from 'react-toastify'
const initState = {
isLoading:false,
isSuccess:false,
isError:false,
message:"",
products:[]

}
export const createproduct = createAsyncThunk('product/save',async(data,thunkAPI)=>{
    try {
        return  await productService.createproduct(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const allproduct = createAsyncThunk('get/products',async(thunkAPI)=>{
    try {
        return  await productService.getAllproducts()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const productByParentCategory = createAsyncThunk('products-parent-category',async(id,thunkAPI)=>{
    try {
        return  await productService.getproductsByCatParent(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const productSlice = createSlice({
    name:'product',
    reducers:{},
    initialState:initState,
    extraReducers:builder=>{
        builder.addCase(createproduct.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createproduct.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.products = [...state.products, action.payload];
            console.log(action.payload)
            state.isError = false
            toast.success('product creer avec succees')
        })
        .addCase(createproduct.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.response.data.message
            toast.error(action.payload.response.data.message)
        })
        .addCase(allproduct.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(allproduct.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.products = action.payload;
            console.log(action.payload)
            state.isError = false
           
        })
        .addCase(allproduct.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.response.data.message
            toast.error(action.payload.response.data.message)
        })
        .addCase(productByParentCategory.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(productByParentCategory.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.products = action.payload;
            console.log(action.payload)
            state.isError = false
           
        })
        .addCase(productByParentCategory.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.response.data.message
            toast.error(action.payload.response.data.message)
        })
     
    }
})
export default productSlice.reducer 