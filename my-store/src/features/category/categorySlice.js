import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import categorieService from './categoryService'
import {toast} from 'react-toastify'
const initState = {
isLoading:false,
isSuccess:false,
isError:false,
message:"",
categories:[]

}
export const createcategory = createAsyncThunk('category/save',async(data,thunkAPI)=>{
    try {
        return  await categorieService.createCategory(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const getcategories = createAsyncThunk('categories/get',async(thunkAPI)=>{
    try {
        return  await categorieService.getAllCategories()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const addsouscategorie = createAsyncThunk('add-sous-category/',async(data,thunkAPI)=>{
    try {
        console.log(data)
        return  await categorieService.addSousCategory(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const deletecategorie = createAsyncThunk('delete-category/',async(id,thunkAPI)=>{
    try {
        console.log(id)
        return  await categorieService.categorydelete(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const recuperercategorie = createAsyncThunk('get-category-parent/',async(id,thunkAPI)=>{
    try {
        console.log(id)
        return  await categorieService.recupereCategory(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const categorySlice = createSlice({
    name:'category',
    reducers:{},
    initialState:initState,
    extraReducers:builder=>{
        builder.addCase(createcategory.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createcategory.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.categories = [...state.categories, action.payload];
            console.log(action.payload)
            state.isError = false
            toast.success('category creer avec succees')
        })
        .addCase(createcategory.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.response.data.message
            toast.error(action.payload.response.data.message)
        }).addCase(getcategories.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getcategories.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.categories = action.payload
            console.log(action.payload)
            state.isError = false
           
        })
        .addCase(getcategories.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.response.data.message
            toast.error(action.payload.response.data.message)
        }).addCase(addsouscategorie.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(addsouscategorie.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
        console.log(action.payload)
        const updatedCategory = action.payload;

        state.categoriesadded =updatedCategory
        
        })
        
        .addCase(addsouscategorie.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.response.data.message
            toast.error(action.payload.response.data.message)
        })
        .addCase(deletecategorie.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deletecategorie.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
        console.log(action.payload)
        const deletedCategoryId = action.payload._id; // Assurez-vous que action.payload contient l'_id de la catégorie supprimée
    
        // Filtrer les catégories pour exclure celle qui a été supprimée
        state.categories = state.categories.filter(cat => cat._id !== deletedCategoryId);
        
        })
        
        .addCase(deletecategorie.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.response.data.message
            toast.error(action.payload.response.data.message)
        })
        .addCase(recuperercategorie.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(recuperercategorie.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
        console.log(action.payload)
       
    
     
        state.categoriesherarchy =action.payload
        
        })
        
        .addCase(recuperercategorie.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.response.data.message
            toast.error(action.payload.response.data.message)
        })
     
    }
})
export default categorySlice.reducer 