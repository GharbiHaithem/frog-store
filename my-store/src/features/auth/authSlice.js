import {createAction, createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import authentificationService from './authService'
import{toast} from 'react-toastify'

const initState = {
isLoading:false,
isSuccess:false,
isError:false,
message:"",
user:{}

}
export const createuser = createAsyncThunk('user/signup',async(data,thunkAPI)=>{
    try {
        return  await authentificationService.signup(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const updateUser = createAsyncThunk('user/edit',async(data,thunkAPI)=>{
    console.log(data)
    try {
        return  await authentificationService.updateuser(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const addadress = createAsyncThunk('add/adress',async(data,thunkAPI)=>{
    console.log(data)
    try {
        return  await authentificationService.addaddress(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const lastuser = createAsyncThunk('user/latest',async(thunkAPI)=>{
    try {
        return  await authentificationService.getLastUser()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const login = createAsyncThunk('user/login',async(data,thunkAPI)=>{
    try {
        return  await authentificationService.login(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const resetState = createAction('/logout')
export const authSlice = createSlice({
    name:'auth',
    reducers:{},
    initialState:initState,
    extraReducers:builder=>{
        builder.addCase(createuser.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createuser.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user =  action.payload.newUser;
            console.log(action.payload)
            state.isError = false
            state.update= false
        })
        .addCase(createuser.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.response.data.msg
         toast.error(action.payload.response.data.msg)
        })
        .addCase(lastuser.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(lastuser.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user =  action.payload;
            console.log(action.payload)
            state.isError = false
          
        })
        .addCase(lastuser.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
         
        })
        .addCase(resetState,(state)=>{
            state.user={}
            state.isLoading=false
            state.isError=false
            state.isSuccess=false
            state.message =""
            state.isDisconnected = true
        })
        .addCase(login.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user =  action.payload;
            console.log(action.payload)
          
            localStorage.setItem('disconnect',JSON.stringify(false))
            setTimeout(()=>{
                localStorage.setItem('user',JSON.stringify(action.payload))
            },2000)
            state.isError = false
            state.isDisconnected = false
          
        })
        .addCase(login.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.response.data.message
         
        })
        .addCase(updateUser.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user =  action.payload.user;
            localStorage.setItem('user',JSON.stringify(action.payload.user))
            localStorage.setItem('disconnect', JSON.stringify(true) ); 
            console.log(action.payload)
            state.isError = false
            state.isDisconnected = false
            state.update= true
        })
        .addCase(updateUser.rejected,(state,action)=>{
            console.log(action.payload)
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.response.data.message
         
        })
        .addCase(addadress.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(addadress.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user =  action.payload.user;
            localStorage.setItem('user',JSON.stringify(action.payload.user))
            console.log(action.payload)
            state.isError = false
            state.isDisconnected = false
          
        })
        .addCase(addadress.rejected,(state,action)=>{
            console.log(action.payload)
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.response.data.message
         
        })
     
      
     
    }
})
export default authSlice.reducer 