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
export const deleteProduct = createAsyncThunk('delete/product',async(id,thunkAPI)=>{
    try {
        return  await productService.deleteProduct(id)
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
export const productByid = createAsyncThunk('product-id',async(id,thunkAPI)=>{
    try {
        return  await productService.getproductsById(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateproduct = createAsyncThunk('product-edit',async(data,thunkAPI)=>{
    try {
        return  await productService.updateproduct(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const deleteimg = createAsyncThunk('img-delete',async(data,thunkAPI)=>{
    try {
        return  await productService.deleteimageProduct(data)
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
        .addCase(deleteProduct.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteProduct.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
          state.products = state.products.filter(
    (prod) => prod._id !== action.payload.prod._id
  );
            console.log(action.payload)
            state.isError = false
            toast.error('product supprimé avec succees')
        })
        .addCase(deleteProduct.rejected,(state,action)=>{
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
          .addCase(productByid.pending,(state)=>{
                    state.isLoading = true
                })
                .addCase(productByid.fulfilled,(state,action)=>{
                    state.isLoading = false
                    state.isSuccess = true
                    state.productbyid = action.payload;
                    console.log(action.payload)
                    state.isError = false
                   
                })
                .addCase(productByid.rejected,(state,action)=>{
                    state.isLoading = false
                    state.isSuccess = false
                    state.isError = true
                    state.message = action.payload
                
                })
                     .addCase(updateproduct.pending,(state)=>{
                    state.isLoading = true
                })
                .addCase(updateproduct.fulfilled,(state,action)=>{
                    state.isLoading = false
                    state.isSuccess = true
                    state.productbyid = action.payload.product;
                    console.log(action.payload)
                    state.isError = false
                   
                })
                .addCase(updateproduct.rejected,(state,action)=>{
                    state.isLoading = false
                    state.isSuccess = false
                    state.isError = true
                    state.message = action.payload
                
                })
               .addCase(deleteimg.pending,(state)=>{
                    state.isLoading = true
                })
                .addCase(deleteimg.fulfilled,(state,action)=>{
                    state.isLoading = false
                    state.isSuccess = true
                    state.products = action.payload.product;
                    console.log(action.payload)
                    state.isError = false
                   
                })
                .addCase(deleteimg.rejected,(state,action)=>{
                    state.isLoading = false
                    state.isSuccess = false
                    state.isError = true
                    state.message = action.payload
                
                })
    }
})
export default productSlice.reducer 