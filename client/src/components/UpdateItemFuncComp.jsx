import { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';

const UpdateItemFuncComp = () => {
    
    const [updatedItem, setUpdatedItem] = useState({})
    const { id } = useParams();
    
    useEffect(() => {
        const url = `http://localhost:9000/database/${id}`;
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setUpdatedItem(json[0]);
            } catch (error) {
                console.log('Error description: ', error);
            };
        }
        fetchData();
    }, [setUpdatedItem, id]);
    
    
    const handleChange = (e) => {
        setUpdatedItem(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    
    const onUpdate = async () => {
        if(updatedItem.id !== "" || undefined) {
            try{

                const response =  await fetch("http://localhost:9000/database/update/"+updatedItem.id, 
                {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                },
                body: JSON.stringify(updatedItem)
            });
            console.log('updated response: ', response);
            setUpdatedItem(response.json());
        } catch (err) {
            console.log("err: ", err);
        }
              
        }
    }
    
    return (
        <div class="bg-gray-400 mt-16 ml-2 mr-2 p-2 rounded-xl h-32 ">        
            <div class="text-lg ml-4">
                <label > Item name: &nbsp;
                <input type="text" placeholder="item name" name="title" onChange={handleChange} value={updatedItem.title || ''}></input>
                </label>
                <label> Quantity: &nbsp;
                <input type="number" placeholder="quantity" name="quantity" onChange={handleChange} value={updatedItem.quantity || ''}></input>
                </label>
                <label> Goods Location: &nbsp;
                <input type="text" placeholder="location" name="location" onChange={handleChange} value={updatedItem.location || ''}></input>
                </label>
                <label> Customer Name: &nbsp;
                <input type="text" placeholder="customer name"  name="customer_name" onChange={handleChange} value={updatedItem.customer_name || ''}></input>
                </label>
                <label> Item Status: &nbsp; 
                <input type="text" placeholder="item status" name="item_status" onChange={handleChange} value={updatedItem.item_status || ''}></input>
                </label>
                <label> Image:
                <input type="image" alt="" name="image" onChange={handleChange} value={updatedItem.image || ''}></input>
                </label>
            </div>
            <div>
                <button class="text-2xl p-1 mt-9 bg-amber-600 rounded-lg w-48 ml-4" onClick={() => onUpdate()}>Update Item</button>
            </div>
        </div>
        
        )
    }
    
    export default UpdateItemFuncComp;