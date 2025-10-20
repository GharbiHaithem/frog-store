import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import commandeService from './commandeService'
import{toast} from 'react-toastify'
const initState = {
isLoading:false,
isSuccess:false,
isError:false,
message:"",
commande:{}

}
export const createcommande = createAsyncThunk('commande/save',async(data,thunkAPI)=>{
    try {
        return  await commandeService.createCommande(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const commande = createAsyncThunk('commande/get',async(id,thunkAPI)=>{
      try {
          return  await commandeService.commandeByUser(id)
      } catch (error) {
          return thunkAPI.rejectWithValue(error)
      }
  })
  export const allcommandesuser = createAsyncThunk('commande/user',async(id,thunkAPI)=>{
    try {
        return  await commandeService.allcommandesUser(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const commandebyid  = createAsyncThunk('commande/id',async(id,thunkAPI)=>{
    try {
        return  await commandeService.commandesbyid(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const commandes  = createAsyncThunk('commandes',async(thunkAPI)=>{
    try {
        return  await commandeService.allcommande()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const editstatus  = createAsyncThunk('statusedit',async(id,thunkAPI)=>{
    try {
        return  await commandeService.editstatus(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const commandeSlice = createSlice({
    name:'commande',
    reducers:{},
    initialState:initState,
    extraReducers:builder=>{
        builder.addCase(createcommande.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createcommande.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.commande =  action.payload;
            console.log(action.payload)
            state.isError = false
          
        })
        .addCase(createcommande.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.error
         
        })
        .addCase(commande.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(commande.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.commande =  action.payload;
            console.log(action.payload)
            state.isError = false
          
        })
        .addCase(commande.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.error
         
        })
        .addCase(allcommandesuser.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(allcommandesuser.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.commandes =  action.payload;
            console.log(action.payload)
            state.isError = false
          
        })
        .addCase(allcommandesuser.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.error
         
        })
        .addCase(commandebyid.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(commandebyid.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.commandebyid =  action.payload;
            console.log(action.payload)
            state.isError = false
          
        })
        .addCase(commandebyid.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload.error
         
        })
        .addCase(commandes.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(commandes.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.commande =  action.payload;
            console.log(action.payload)
            state.isError = false
          
        })
        .addCase(commandes.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
         
        })
          .addCase(editstatus.pending,(state)=>{
            state.isLoading = true
        })
      .addCase(editstatus.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.isError = false;

  const updatedCommande = action.payload; // la commande mise à jour (avec status = "read")

  // Vérifie que state.commande est bien un tableau
  if (Array.isArray(state.commande)) {
    state.commande = state.commande.map(cmd =>
      cmd._id === updatedCommande._id ? updatedCommande : cmd
    );
  } else {
    // Si jamais ce n'est pas un tableau, on met à jour directement
    state.commande = [updatedCommande];
  }

  console.log("✅ Commande mise à jour :", updatedCommande);
})
        .addCase(editstatus.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
         
        })
     
    }
})
export default commandeSlice.reducer 