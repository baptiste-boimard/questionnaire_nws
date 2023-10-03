import { configureStore } from '@reduxjs/toolkit';

// == IMPORT REDUCER ==
import rootReducer from '../reducers';

// import middlewareCompose from '../middlewares';

const store = configureStore({
  reducer: rootReducer,
});

/*Exportation des types RootState et AppDispatch 
pour typer useSelector et useDispatch dans hooks.tsx*/
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;