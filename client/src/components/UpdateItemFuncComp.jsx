import { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
import { FileUploader } from "react-drag-drop-files";
import UploadImage from '../utils/UploadImage';
import logo from '../logo.svg';
import { fileTypes } from '../utils/ImageFileTypes';

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
    
    const handleImage = async (e) => {
        const imgUrl = await UploadImage(e);
        if (e instanceof File) {
            setUpdatedItem({...updatedItem, image_src: imgUrl});
        } 
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
            setUpdatedItem(updatedItem);
            const data = response.json();
            return data;
        } catch (err) {
            console.log("err: ", err);
            }
        }
    }
 
    return (
        <div class="bg-stone-300 border border-stone-600 mt-16 ml-2 mr-2 p-2 rounded-xl h-96 flex">        
                <div class="mt-2 mb-2"> 
                    <label > Item name: &nbsp;
                    <input type="text" placeholder="item name" name="title" onChange={handleChange} value={updatedItem.title || ''}></input>
                    </label>
                </div>
                <div class="mb-2"> 
                    <label> Quantity: &nbsp;
                    <input type="number" placeholder="quantity" name="quantity" onChange={handleChange} value={updatedItem.quantity || ''}></input>
                    </label>
                </div>
                <div class="mb-2"> 
                    <label> Goods Location: &nbsp;
                    <input type="text" placeholder="location" name="location" onChange={handleChange} value={updatedItem.location || ''}></input>
                    </label>
                </div>
                <div class="mb-2">                         
                    <label> Customer Name: &nbsp;
                    <input type="text" placeholder="customer name"  name="customer_name" onChange={handleChange} value={updatedItem.customer_name || ''}></input>
                    </label>
                </div>
                    <div class="mb-2"> 
                    <label> Item Status: &nbsp; 
                    <input type="text" placeholder="item status" name="item_status" onChange={handleChange} value={updatedItem.item_status || ''}></input>
                </label>
                </div>
                <div class="bg-red-400 auto w-3/12">
                    <label> Image:
                        <FileUploader handleChange={handleImage} name="image_src" types={fileTypes} />
                        <img class="object-contain h-4/5 w-96" src={updatedItem.image_src || logo} alt=""/>
                    </label>
                </div>
                <div>
                    <button class="text-2xl p-1 mt-9 bg-amber-600 rounded-lg w-48 ml-4" onClick={() => onUpdate()}>Update Item</button>
                </div>
        </div>  
        )
    }
    
    export default UpdateItemFuncComp;