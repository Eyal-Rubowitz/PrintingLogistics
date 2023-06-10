import { useState } from 'react';
import { FileUploader } from "react-drag-drop-files";
import logo from '../logo.svg';
import UploadImage from '../utils/UploadImage';
import { fileTypes } from '../utils/ImageFileTypes';
import { defaultVal } from '../utils/DefaultItemVal';

const AddItemFuncComp = () => {
   
    const [item, setItem] = useState(defaultVal);
     
    const handleChange = (e) => {
            setItem(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleImage = async (e) => {
        const imgUrl = await UploadImage(e);
        if (e instanceof File) {
            setItem({...item, image_src: imgUrl});
        } 
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
      }

    const handleClick = async (e) => {
        e.preventDefault();
        const jsonBody = item;
        try {
            if (item.title !== "" && 
                item.quantity !== 0 && 
                item.location !== "" && 
                item.customer_name && 
                item.item_status !== "") {
                const response = await fetch("http://localhost:9000/database/add-item", {
                    method: "POST",
                    body: JSON.stringify(jsonBody),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }})
                    alert("Item Added Successfully!")
                    setItem(defaultVal);
                    const data = response.json();
                    return data;
                }
            } catch (err) {
            throw err;
        }
    }

    return (
        <div class="bg-stone-300 border border-stone-600 mt-16 ml-2 mr-2 p-2 rounded-xl h-96 flex" onChange={handleDragOver}>
                <div class="mt-2 mb-2"> 
                    <label> Item name: &nbsp;
                        <input type="text" placeholder="item name" name="title" onChange={handleChange} value={item.title}></input>
                    </label>
                </div>
                <div class="mb-2">
                    <label> Quantity: &nbsp;
                        <input type="number" placeholder="quantity" name="quantity" onChange={handleChange} value={item.quantity}></input>
                    </label>
                </div>
                <div class="mb-2">
                    <label> Goods Location: &nbsp;
                        <input type="text" placeholder="location" name="location" onChange={handleChange} value={item.location}></input>
                    </label>
                </div>
                <div class="mb-2">
                    <label> Customer Name: &nbsp;
                        <input type="text" placeholder="customer name"  name="customer_name" onChange={handleChange} value={item.customer_name}></input>
                    </label>
                </div>
                <div class="mb-2">
                    <label> Item Status: &nbsp; 
                        <input type="text" placeholder="item status" name="item_status" onChange={handleChange} value={item.item_status}></input>
                    </label>
                </div>
                <div class="bg-red-500 auto w-3/12">
                    <label> Image:
                        <FileUploader handleChange={handleImage} name="image_src" types={fileTypes} />
                        <img class="object-contain h-4/5 w-96" src={item.image_src || logo} alt=""/>
                    </label>
                </div>
                <div>
                    <button class="text-2xl p-1 mt-9 bg-amber-600 rounded-lg w-48 ml-4" onClick={handleClick}>Add Item</button>
                </div>
        </div>
    )
}

export default AddItemFuncComp;