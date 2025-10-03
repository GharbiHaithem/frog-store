import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import bannerService from './bannerService'
import {toast} from 'react-toastify'
const initState = {
isLoading:false,
isSuccess:false,
isError:false,
message:"",
images_banner:[]

}
export const createbanner = createAsyncThunk('banner/save',async(data,thunkAPI)=>{
    try {
        return  await bannerService.createbanner(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const banner = createAsyncThunk('banner/get',async(thunkAPI)=>{
    try {
        return  await bannerService.getBanner()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const delbanner = createAsyncThunk('banner/del',async(data,thunkAPI)=>{
    try {
        return  await bannerService.delBanner(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const bannerSlice = createSlice({
    name:'banner',
    reducers:{},
    initialState:initState,
    extraReducers:builder=>{
        builder.addCase(createbanner.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createbanner.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.images_banner = [...state.brands, action.payload];
            console.log(action.payload)
            state.isError = false
            toast.success('banner creer avec succees')
        })
        .addCase(createbanner.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.response.data.error
            toast.error(action.payload.response.data.message)
        })
     .addCase(banner.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(banner.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.images_banner = action.payload;
            console.log(action.payload)
            state.isError = false
     
        })
        .addCase(banner.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.response.data.error
   
        })
      .addCase(delbanner.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(delbanner.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
         const deletedId =(action.payload.images_banner[0]?.publicId) // backend doit renvoyer { publicId: "xxx" }
console.log(action.payload.images_banner[0]?.publicId)
  // garder seulement celles qui ne correspondent pas au deletedId
  state.images_banner = state.images_banner.filter(
    (img) => img.publicId !== deletedId
  );
            state.isError = false
     
        })
        .addCase(delbanner.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.response.data.error
   
        })
    }
})
export default bannerSlice.reducer 