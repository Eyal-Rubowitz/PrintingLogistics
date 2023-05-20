import { useState } from 'react';

const AddItemFuncComp = () => {

    const defaultVal = {
            title: "",
            quantity: null,
            location: "",
            customer_name: "",
            item_status: "",
            image: ""
        }
   

    const [item, setItem] = useState({
        title: "",
        quantity: null,
        location: "",
        customer_name: "",
        item_status: "",
        image: ""
    });

    const handleChange = (e) => {
        setItem(prev => ({...prev, [e.target.name]: e.target.value}))
        console.log("item: ", item);
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const jsonBody = {
            title: item.title,
            quantity: item.quantity,
            location: item.location,
            customer_name: item.customer_name,
            item_status: item.item_status,
            image: item.image
        }
        try {
            if (item.title !== "" && 
                item.quantity != null && 
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
                    await setItem(defaultVal);
                    alert("Item Added Successfully!")
                    const data = response.json();
                    return data;
                }
                } catch (err) {
            throw err;
        }
    }

    return (
        <div class="flex">
            <form>
                <label> Item name: &nbsp;
                    <input type="text" placeholder="item name" name="title" onChange={handleChange} value={item.title}></input>
                </label>
                <label> Quantity: &nbsp;
                    <input type="number" placeholder="quantity" name="quantity" onChange={handleChange} value={item.quantity}></input>
                </label>
                <label> Goods Location: &nbsp;
                    <input type="text" placeholder="location" name="location" onChange={handleChange} value={item.location}></input>
                </label>
                <label> Customer Name: &nbsp;
                    <input type="text" placeholder="customer name"  name="customer_name" onChange={handleChange} value={item.customer_name}></input>
                </label>
                <label> Item Status: &nbsp; 
                    <input type="text" placeholder="item status" name="item_status" onChange={handleChange} value={item.item_status}></input>
                </label>
                <label> Image:
                    <input type="image" alt="" name="image" onChange={handleChange} value={item.image}></input>
                </label>
                <div>
                    <button class="text-base" onClick={handleClick}>Add Item</button>
                </div>
            </form>
        </div>
    )
}

export default AddItemFuncComp;