import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ItemDataRowFuncComponent from './ItemDataRowFuncComponent';

const StoreListFuncComp = () => {
    
    const [itemList, setItemList] = useState([]);
    const [titleFilter, setTitleFilter ] = useState([]);
    const [locationFilter, setLocationFilter ] = useState([]);
    const [customerFilter, setCustomerFilter ] = useState([]);
    const [statusFilter, setStatusFilter ] = useState([]);
    const [filters, setFilters] = useState({"title": "Show All", "location": "Show All", "customer": "Show All", "status": "Show All"});
    
    useEffect(() => {
        const url = "http://localhost:9000/database";
        console.log('filters: ', filters);
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
        if(filters['title'] !== "Show All" && 
           filters['location'] !== "Show All" && 
           filters['customer'] !== "Show All" && 
           filters['status'] !== "Show All") {
            //    console.log('Hello Filter!');
               const filteredList = json
            //    console.log('filters["title"] === "Show All": ',filters['title']);
            //    if(filters['title'] === "Show All") console.log('CLG ["title"] === "Show All"');

                if(filters['title'] !== "Show All") filteredList.filter(item => item.title === filters['title'])
            //     if(filters['location'] !== "Show All") console.log('CLG ["location"] !== "Show All"');
            //     if(filters['location'] !== "Show All") filteredList.filter(item => item.location === filters['location'])
            //     if(filters['customer'] !== "Show All") filteredList.filter(item => item.customer_name === filters['customer'])
            //     if(filters['status'] !== "Show All") filteredList.filter(item => item.item_status === filters['status']);
            //         console.log("filteredList: ", filteredList);
            //            setItemList(filteredList);                   
                } else {
                    setItemList(json);
                    const nameList = ["Show All", ...Array.from(new Set(json.map((item) => item.title)))];
                const location = ["Show All", ...Array.from(new Set(json.map((item) => item.location)))];
                const customer = ["Show All", ...Array.from(new Set(json.map((item) => item.customer_name)))];
                const status = ["Show All", ...Array.from(new Set(json.map((item) => item.item_status)))];
                setTitleFilter(nameList);
                setLocationFilter(location);
                setCustomerFilter(customer);
                setStatusFilter(status);
            }
                } catch (error) {
                    console.log('Error description: ', error);
                }; 
        }
        fetchData();
    },[filters]);

    const onDelete = async (idItemToDelete) => {
            await fetch("http://localhost:9000/database/delete/"+idItemToDelete, { method: "DELETE" });  
            const reList = itemList.filter(item => item.id !== idItemToDelete);
            setItemList(reList);
    }
    
    const onFilterItemList = (e) => {
        console.log("Go and filter!");
        const filtersChange = filters;
        filtersChange[e.target.name] = e.target.value;
        console.log("setFilters: ", filtersChange);
        setFilters(filtersChange);
    }
  
        return  (
            <div class="bg-gray-400 max-w-full rounded-2xl m-9 w-11/12 z-1">
                <div id="filter-selection-container" >
                    <form class="bg-gray-400 max-w-full fixed top-0 rounded-2xl w-11/12">
                        <label  class="ml-6" >Text search: &nbsp;
                            <input type="text" class= "rounded-md mt-4" />
                        </label>
                        <label class="ml-6">Item Name: &nbsp; <select class="rounded-md mt-4" name="title" value={filters['title']} onChange={(e) => onFilterItemList(e)}>
                            {titleFilter.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        </label>
                        <label class="ml-6">Goods Location: &nbsp; <select class="rounded-md mt-4" name="location" value={filters['location']} onChange={(e) => onFilterItemList(e)}>
                            {locationFilter.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        </label>
                        <label class="ml-6"> Customer Name: &nbsp; 
                            <select class="rounded-md mt-4" name="customer" value={filters['customer']} onChange={(e) => onFilterItemList(e)}>
                                {customerFilter.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                 ))}
                            </select>
                        </label>
                        <label class="ml-6"> Item Status: &nbsp; 
                            <select class="rounded-md mt-4" name="status" value={filters['status']} onChange={(e) => onFilterItemList(e)}>
                                {statusFilter.map((option) => (
                                    <option key={option} value={option}>{option}</option>
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
                {(itemList.length > 0) ? <div id="item-list-container" class="mt-20">
                    {itemList.map((item) => {
                        return <div key={item.id}><ItemDataRowFuncComponent itemArg={item} onItemDelete={onDelete} /></div>
                    })}
                    </div> : <div>objList do not defined yet...</div>}
                </div> 
            )
        };

    export default StoreListFuncComp;