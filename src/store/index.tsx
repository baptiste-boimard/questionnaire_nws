import { configureStore } from '@reduxjs/toolkit';

import rootReducer from '../reducers';
// import middlewareCompose from '../middlewares';

const store = configureStore({
  reducer: rootReducer,
});

export default store;