import logo from '../logo.svg';
import '../App.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const StoreListFuncComp = () => {
    
    const [itemList, setItemList] = useState([]);
    
    useEffect(() => {
        const url = "http://localhost:9000/database";
        console.log('an effect happened!')
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setItemList(json);
            } catch (error) {
                console.log('Error description: ', error);
            };
        }
        fetchData();
    },[]);
   
    const onDelete = async (idItemToDelete) => {
            await fetch("http://localhost:9000/database/delete/"+idItemToDelete, { method: "DELETE" });  
            const reList = itemList.filter(item => item.id !== idItemToDelete);
            setItemList(reList);
    }

  
        return  (
            (itemList.length > 0) ? <div class="bg-gray-400 max-w-full rounded-2xl m-9 w-11/12 z-1">
                <div id="filter-selection-container" >
                    <form class="bg-gray-400 max-w-full fixed top-0 rounded-2xl w-11/12">
                        <label  class="ml-6" >Text search: &nbsp;
                            <input type="text" class= "rounded-md mt-4" />
                        </label>
                        <label class="ml-6">Item Name: &nbsp; <select class="rounded-md mt-4">
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        </label>
                        <label class="ml-6">Goods Location: &nbsp; <select class="rounded-md mt-4">
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        </label>
                        <label class="ml-6"> Customer Name: &nbsp; 
                            <select class="rounded-md mt-4">
                                {options.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                 ))}
                            </select>
                        </label>
                        <label class="ml-6"> Item Status: &nbsp; 
                            <select class="rounded-md mt-4">
                                {options.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                            </select>
                        </label>
                        <div class="text-2xl my-2 mx-5">
                            <button class="bg-orange-500 rounded-lg w-48 border border-black">
                                <Link to="/add-item">Add new item</Link>
                            </button>
                        </div>
                    </form>
                </div>
                <div class="mt-20">
                    {itemList.map((item) => {
                        return <div key={item.id} class="bg-blue-600 m-5 p-4 rounded-3xl flex justify-evenly">
                                    <div class="float-left mr-20 text-2xl">
                                        <div class="mb-4"> Item name: {item.title} </div>
                                        <div class="mb-4"> Customer name: {item.customer_name} </div>
                                        <div class="mb-4"> Goods location: {item.location} </div>
                                    </div>
                                    <button onClick={() => {}} class="bg-amber-500 float-left rounded-full w-1/6 text-3xl font-bold"> 
                                        <Link to={`/update/${item.id}`}>Update Item</Link> 
                                    </button>
                                    <button onClick={() => onDelete(item.id)}  class="bg-red-600 float-left rounded-full w-1/6 text-3xl font-bold">
                                       Delete Item
                                    </button>
                                    <img src={(item.image) ? item.image : logo} alt="" class="ml-6 float-right w-1/6 h-4/5"/>
                                </div>;
                    })}
                </div> 
                </div> : <div>objList do not defined yet...</div>
            )
        };

        const options = [
            {
              label: "Apple",
              value: "apple",
            },
            {
              label: "Mango",
              value: "mango",
            },
            {
              label: "Banana",
              value: "banana",
            },
            {
              label: "Pineapple",
              value: "pineapple",
            },
          ];

    export default StoreListFuncComp;