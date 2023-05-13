import { useState } from "react";
const UpdateItemFuncComp = (props) => {

    // const itemToChange = props.list.filter(item => item ===)
    console.log("update props: ", props.item);
    const [item, setItem] = useState({});

    const handleChange = (e) => {
        setItem(prev => ({...prev, [e.target.name]: e.target.value}))
        // console.log("item: ", item);
    }


    return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '5%'}}>
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
                    <button style={{fontSize: "1.6rem", marginTop: '2%'}} onClick={() => props.handleUpdatedItem(item)}>Update Item</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateItemFuncComp;