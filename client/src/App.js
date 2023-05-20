import './App.css';
import StoreListFuncComp from './components/storeComponent';
import AddItemFuncComp from './components/AddItemFuncComponent';
import UpdateItemFuncComp from './components/UpdateItemFuncComp';
// import CoolComponent from './components/coolComponent';
import React from "react";
import { 
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  
  
  return (
    <div className="App" >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StoreListFuncComp />}/>
          <Route path='/add-item' element={<AddItemFuncComp />}/>
          <Route path='/update/:id' element={<UpdateItemFuncComp />}/>
          {/* <Route path='/delete' element={<StoreListFuncComp updatedList={ updatedList }/>}/> */}
          {/* <Route path='/cool-component' element={<CoolComponent />}/> */}
        </Routes>

        
      </BrowserRouter>
    </div>
  );
}



export default App;
