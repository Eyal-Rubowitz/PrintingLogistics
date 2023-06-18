import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ItemDataRowFuncComponent from './ItemDataRowFuncComponent';

const StoreListFuncComp = () => {
    
    const [itemList, setItemList] = useState([]);
    const [textualSearch, setTextualSearch] = useState("")
    const [filter, setFilters] = useState("Show All");
    
    useEffect(() => {
        let filterArg = ""; 
        switch (filter) {
            case "Show All":
                filterArg = "title OR location OR customer_name OR item_status";
                break;
            case "Item name":
                filterArg = "title";
                break;
            case "Location":
                filterArg = "location";
                break;
            case "Customer name":
                filterArg = "customer_name";
                break;
            case "Status":
                filterArg = "item_status"
                break;
            default:
                filterArg = "title OR location OR customer_name OR item_status";
        }
        const searchArg = (textualSearch.length > 0) ? `filter-search/${filterArg}/${textualSearch}` : "";
        const url = `http://localhost:9000/database/${searchArg}`;
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
    },[filter, textualSearch]);

    const onDelete = async (idItemToDelete) => {
            await fetch("http://localhost:9000/database/delete/"+idItemToDelete, { method: "DELETE" });  
            const reList = itemList.filter(item => item.id !== idItemToDelete);
            setItemList(reList);
    }
    
    const onFilterItemList = (e) => {
        setFilters(e.target.value);
    }
  
    const onTypingText = (e) => {
        setTextualSearch(e.target.value);
    }

    return  (
            <div class="bg-gray-400 bg-opacity-60 max-w-full rounded-2xl m-9 w-11/12 z-1">
                <div id="filter-selection-container">
                    <form class="bg-gray-400 !bg-opacity-100 max-w-full fixed top-0 rounded-b-lg w-11/12 h-20">
                        <label  class="ml-6 text-xl" >Text search: &nbsp;
                            <input type="text" autoComplete='items-filter' value={textualSearch} onChange={onTypingText} class= "rounded-md mt-4" />
                        </label>
                        <label class="ml-6 text-xl">Filter by: &nbsp; <select class="rounded-md mt-4" name="title" value={filter['title']} onChange={(e) => onFilterItemList(e)}>
                            {["Show All", "Item name", "Location", "Customer name", "Status"].map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        </label>
                            <button class="bg-orange-500 rounded-lg w-48 border border-black float-right mt-5 mr-10">
                                <Link class="text-2xl my-2 mx-5" to="/add-item">Add new item</Link>
                            </button>
                    </form>
                </div>
                {(itemList.length > 0) ? <div id="item-list-container" class="mt-20">
                    {itemList.map((item) => {
                        return <div key={item.id}><ItemDataRowFuncComponent itemArg={item} onItemDelete={onDelete} /></div>
                    })}
                    </div> : <div>objList do not defined yet...</div>}
                </div> 
            )
        };

    export default StoreListFuncComp;