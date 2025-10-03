import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../features/category/categorySlice' 
import productReducer from '../features/product/productSlice' 
import cartReducer from '../features/cart/cartSlice'
import authReducer from '../features/auth/authSlice'
import commandeReducer from '../features/commande/commandeSlice'
import brandReducer from '../features/Brand/brandSlice'
import bannerReducer from '../features/banner/bannerSlice'
export const store = configureStore({
      reducer: {
      category: categoryReducer,
      product:productReducer,
      cart:cartReducer,
      auth:authReducer,
      commande:commandeReducer,
      brand:brandReducer,
      banner:bannerReducer
      },
    
    });