import React from 'react';
import { useAppSelector } from '../../hooks';

//== IMPORT COMPONENTS ==
import Header from '../Header';
import Login from '../Login';


import './App.css';

function App() {

  // == CALL STORE ==
  const { isOpenLogin, isOpenSignup } = useAppSelector(state => state.loginReducer);

  return (
    <div className="App">
      <Header />
      {((isOpenLogin || isOpenSignup) && <Login />)}
    </div>
  );
}

export default App;
