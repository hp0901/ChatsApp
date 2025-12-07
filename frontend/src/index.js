import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

// 1. IMPORT PersistGate
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'; // <-- ADD THIS
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducer';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'profile', 'cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// 2. CREATE the persistor object (This is what gives you the warning)
const persistor = persistStore(store); 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* 3. WRAP your app with PersistGate and pass the persistor */}
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);