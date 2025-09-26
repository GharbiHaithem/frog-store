import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../features/category/categorySlice' 
import productReducer from '../features/product/productSlice' 
import uploadReducer from '../features/upload/uploadSlice' 
import brandReducer from '../features/brand/brandSlice' 

export const store = configureStore({
      reducer: {
      category: categoryReducer,
      product:productReducer,
      upload:uploadReducer,
     brand: brandReducer
      },
    
    });