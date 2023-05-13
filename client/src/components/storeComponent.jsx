import logo from '../logo.svg';
import '../App.css';
import { Link } from 'react-router-dom';
// import { useState, useEffect } from 'react';

const StoreListFuncComp = (props) => {

    // const [itemList, setItemList] = useState(Array(props.list));
    // useEffect(() => {
    //     setItemList(Array(props.list));
    // }, [setItemList])

    // const handleDelete = async (itemId) => {
    //     return itemId;
    // }

        return  (
            (props.list.length > 0) ? <div style={{backgroundColor: "darkGray", maxWidth: "96%", borderRadius: "25px", margin: "2%", width: '96%', zIndex: '1' }}>
                <div id="filter-selection-container">
                    <form style={{position: 'fixed', top: '0px', right: '2%', width: '96%', height: "90px", backgroundColor: 'darkGray',  borderRadius: "5px"}}>
                        <label>Text search: &nbsp;
                            <input type="text"  style={{marginRight: "1%", marginTop: "0.8%", borderRadius: "5px"}}/>
                        </label>
                        <label>Item Name: &nbsp; <select style={{marginRight: "1%", marginTop: "0.6%", borderRadius: "5px"}}>
                            {options.map((option) => (
                                <option value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        </label>
                        <label>Goods Location: &nbsp; <select style={{marginRight: "1%", marginTop: "0.6%", borderRadius: "5px"}}>
                            {options.map((option) => (
                                <option value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        </label>
                        Customer Name: &nbsp; <select style={{marginRight: "1%", marginTop: "0.6%", borderRadius: "5px"}}>
                            {options.map((option) => (
                                <option value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        Item Status: &nbsp; <select style={{marginTop: "0.5%", borderRadius: "5px"}}>
                            {options.map((option) => (
                                <option value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        <div style={{fontSize: "1.6rem", marginTop: '5px'}}>
                            <button style={{backgroundColor: 'orange', borderRadius: '10px', width: '10%'}}>
                                <Link to="/add-item">Add new item</Link>
                            </button>
                        </div>
                    </form>
                </div>
                <div>
                    {props.list.map((item) => {
                        return <div key={item.id} style={{backgroundColor: "#1f75ff", margin: "20px 20px 20px 20px", padding: "1% 1% 1% 1%", borderRadius: "25px", display: 'flex', justifyContent: "space-evenly",  overflow: 'hidden'}}>
                            <div style={{float: 'left', marginRight: '5%'}}>
                                <div style={{fontSize: "1.8rem", marginBottom: "1rem"}}>
                                    Item name: {item.title} 
                                </div>
                                <div style={{fontSize: "1.4rem", marginBottom: "1rem"}}>
                                    Customer Name: {item.customer_name}
                                </div>
                                <div style={{fontSize: "1.4rem", marginBottom: "1rem"}}>
                                    Goods location: {item.location}
                                </div>
                            </div>
                            <button onClick={() => props.handleUpdate(item)} style={{backgroundColor: 'salmon', float: 'left', borderRadius: '50px', width: '15%', fontSize: '1.8rem', fontWeight: 'bold'}}> 
                                <Link to={`/update/${item.id}`}>Update Item</Link> 
                            </button>
                            <button onClick={() => props.handleDelete(item.id)} style={{backgroundColor: 'crimson', float: 'left', borderRadius: '50px', width: '15%', fontSize: '1.8rem', fontWeight: 'bold'}}>
                               Delete Item
                            </button>

                            <img src={(item.image) ? item.image : logo} alt="" width="182" height="144" style={{marginLeft: '2%', float:'right'}}/>
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