import {createAction, createAsyncThunk,createSlice} from '@reduxjs/toolkit'
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
export const productByParentCategory = createAsyncThunk('products-parent-category',async(data,thunkAPI)=>{
    try {
        return  await productService.getproductsByCatParent(data)
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

export const searchproduct = createAsyncThunk('product-search',async(titre,thunkAPI)=>{
    try {
        return  await productService.searchproducts(titre)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const productsByCat = createAsyncThunk('products-cat',async(id,thunkAPI)=>{
    try {
        return  await productService.productsCat(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const filterProd = createAsyncThunk('products-filter',async(size,thunkAPI)=>{
    try {
        return  await productService.filterproducts(size)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const resetState = createAction('/clearstateproduct')
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
        .addCase(productsByCat.pending,(state)=>{
            state.isLoading = true
        })
        
        .addCase(productsByCat.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.products = action.payload;
            console.log(action.payload)
            state.isError = false
          
        })
        .addCase(productsByCat.rejected,(state,action)=>{
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
            if (action.payload.titre) {
                const titreSansEspaces = action.payload.titre.replace(/\s+/g, ''); // Supprime tous les espaces
                state[titreSansEspaces] = action.payload.products;
              } else {
                console.error("Le titre est undefined dans le payload:", action.payload);
              }
              
            
            state.totalpages= action.payload.totalProducts
            state.currentages =action.payload.currentPage
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
            state.message = action.payload.response.data.message
            toast.error(action.payload.response.data.message)
        })
        .addCase(searchproduct.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(searchproduct.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.productsearched = action.payload;
            console.log(action.payload)
            state.isError = false
           
        })
        .addCase(searchproduct.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.response.data.message
           
        })
             .addCase(filterProd.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(filterProd.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.products = action.payload;
            console.log(action.payload)
            state.isError = false
           
        })
        .addCase(filterProd.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.response.data.message
           
        })
        .addCase(resetState,(state)=>{
            state.productbyid=null
        })
    }
})
export default productSlice.reducer 