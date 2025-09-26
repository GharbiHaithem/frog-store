import {createAction, createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import uploadServices from './uploadService'
const initialState = {
    images :{},
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:'',
    status:'idle',
    progress:0
}
export const upload = createAsyncThunk('/upload', async(data,thunkAPI)=>{
    try{
        const formData =new FormData()
        for(let i =0 ; i<data.length ;i++){
            formData.append('images',data[i])
        }
        return await uploadServices.uploadImages(formData,{
            onUploadProgress:(event)=>{
                const progress =Math.round((event.loaded / event.total)*100)
                thunkAPI.dispatch(uploadProgress(progress))
            }
        })
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})
export const deleteImg = createAsyncThunk('/delete-img',async(id,thunkAPI)=>{
    try {
     return await uploadServices.deleteImages(id)   
    } catch (error) {
     return thunkAPI.rejectWithValue(error)   
    }
})
export const resetState = createAction('/resetUploadImg')

export const uploadSlice = createSlice({
    name:'upload',
    initialState,
    reducers: {
        // ...Vos autres reducers...
    
        setUploadProgress: (state, action) => {
          state.progress = action.payload;
        },
        uploadProgress: (state, action) => {
            state.progress = action.payload;
          },
      },
    extraReducers:(builder)=>{
        builder.addCase(upload.pending,(state)=>{
            state.isLoading = true
            state.status = 'pending';
            state.progress = 0;
        })
        .addCase(upload.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.isLoading = false
            state.isSuccess=true
            state.images=action.payload
            state.status = 'fulfilled';
        
        })
        .addCase(upload.rejected,(state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.error
            state.images=[]
            state.status = 'rejected';
            state.progress = 0;
        })
        builder.addCase(deleteImg.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteImg.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess=true
            state.images=state.images &&  state.images?.filter((x)=>(x?.public_id !== action.payload.id))
            console.log(action.payload.id)
        })
        .addCase(deleteImg.rejected,(state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.error
            state.images=[]
        })
        .addCase(resetState,(state)=>{
            state.images=[]
            state.isLoading=false
            state.isError=false
            state.isSuccess=false
        })
      
    }
})
export const {uploadProgress}  = uploadSlice.actions;
export default uploadSlice.reducer