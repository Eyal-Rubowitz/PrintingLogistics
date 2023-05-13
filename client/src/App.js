import './App.css';
import StoreListFuncComp from './components/storeComponent';
import AddItemFuncComp from './components/AddItemFuncComponent';
import UpdateItemFuncComp from './components/UpdateItemFuncComp';
// import CoolComponent from './components/coolComponent';
import React, { useEffect, useState } from "react";
import { 
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  
  const [itemList, setItemList] = useState([]);
  const [itemForUpdate, setItemForUpdate] = useState({});
  // const [itemForUpdate, setItemForUpdate] = useState({});
  // const updatedList = (updatedList) => { 
  //   console.log('Hellooo set item... updatedList: ', updatedList)
  //   setItemList(updatedList) };

  const onDelete = async (idItemToDelete) => {
          await fetch("http://localhost:9000/database/delete/"+idItemToDelete, { method: "DELETE" });  
          const reList = itemList.filter(item => item.id !== idItemToDelete);
          setItemList(reList);
  }

  const onSetsUpdate = async (itemForUpdateArg) => {
    await setItemForUpdate(itemForUpdateArg);
    console.log('Hello itemForUpdate :)) ', itemForUpdate)
    console.log('Hello itemForUpdateArg :)) ', itemForUpdateArg)
  }
  
  const onUpdate = async (item) => {
    if(itemForUpdate.id !== "" || undefined) {
      const tempList = itemList;
      tempList[itemForUpdate.id] = item;
      setItemList(tempList);
      console.log('itemList[itemForUpdate.id]: ', itemList[itemForUpdate.id])
    }
      // await fetch("http://localhost:9000/database/update/"+itemForUpdate.id, { method: "UPDATE" });
    // setItemForUpdate(itemForUpdate);
    // const updatedList = [...itemList];
    // updatedList[itemForUpdate.id] = itemForUpdate;
    // console.log("updatedItem: ", itemForUpdate);
    // setItemForUpdate({});
    
  }

  useEffect(() => {
    const url = "http://localhost:9000/database";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        console.log('res: ', response);
        const json = await response.json();
        console.log('fetched endpoint: ', json);
        setItemList(json);
      } catch (error) {
        console.log('Error description: ', error);
      };
    }
    fetchData();
  },[setItemList]);

  const text = <h1>"Hello By React App with variable!"</h1>
  
  return (
    <div className="App" >
      <BrowserRouter>
       <div class="text-red-600 ">Hello from  React App div Element</div>
       <div>{text}</div>
       {/* <div>{objListEl}</div> */}
       {/* <div>Item: {objList[0].title}</div> */}
        <Routes>
          <Route path='/' element={<StoreListFuncComp list={itemList} handleDelete={(id) => onDelete(id)} handleUpdate={(item) => onSetsUpdate(item)}/>}/>
          <Route path='/add-item' element={<AddItemFuncComp />}/>
          <Route path='/update/:id' item={itemForUpdate} element={<UpdateItemFuncComp handleUpdatedItem={(item) => onUpdate(item)}/>}/>
          {/* <Route path='/delete' element={<StoreListFuncComp updatedList={ updatedList }/>}/> */}
          {/* <Route path='/cool-component' element={<CoolComponent />}/> */}
        </Routes>

        
      </BrowserRouter>
    </div>
  );
}



export default App;
