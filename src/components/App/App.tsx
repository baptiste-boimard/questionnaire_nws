import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

//== IMPORT COMPONENTS ==
import Header from '../Header';
import Login from '../Login';
import VerifyEmail from '../VerifyEmail';
import Home from '../Home';


import './App.css';

function App() {

  // == CALL STORE ==
  const { isOpenLogin, isOpenSignup } = useAppSelector(state => state.modalDisplayReducer);

  return (
    <div className="App">
        <Header />
        {((isOpenLogin || isOpenSignup) && <Login />)}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/verify-email' element= {<VerifyEmail/>}/>
        </Routes>
    </div>
  );
}

export default App;
