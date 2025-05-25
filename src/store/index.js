import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

import { api } from '../services/api';
import { categoryApi } from '../services/category.service';
import authReducer from './authSlice';
import { productsApi } from '../services/products.service';
import { orderApi } from '../services/order.sevice';
import { analyticsApi } from '../services/analytics.service';
import { videoApi } from '../services/video.service';
import { sliderApi } from '../services/slider.service';
import { bannerApi } from '../services/banner.service';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'] // Chỉ persist auth state
};

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [analyticsApi.reducerPath]: analyticsApi.reducer,
  [videoApi.reducerPath]: videoApi.reducer,
  [sliderApi.reducerPath]: sliderApi.reducer,
  [bannerApi.reducerPath]: bannerApi.reducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
    .concat(api.middleware)
    .concat(categoryApi.middleware)
    .concat(productsApi.middleware)
    .concat(orderApi.middleware)
    .concat(analyticsApi.middleware)
    .concat(videoApi.middleware)
    .concat(sliderApi.middleware)
    .concat(bannerApi.middleware)
});

export const persistor = persistStore(store);

setupListeners(store.dispatch); 