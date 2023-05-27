import logo from '../logo.svg';
import { Link } from 'react-router-dom';

const ItemDataRowFuncComponent = (props) => {

    const itemArg = props.itemArg;
    
    const onDelete = async (idItemToDelete) => {    
        props.onItemDelete(idItemToDelete)
    }

    return <div key={itemArg.id} class="bg-blue-600 m-5 p-4 rounded-3xl flex justify-evenly">
                <div class="float-left mr-20 text-2xl bg-blue-500 rounded-3xl p-4 w-auto">
                    <div class="mb-4"> Item name: {itemArg.title} </div>
                    <div class="mb-4"> Customer name: {itemArg.customer_name} </div>
                    <div class="mb-4"> Goods location: {itemArg.location} </div>
                </div>
                <button onClick={() => {}} class="bg-amber-500 float-left rounded-full w-1/6 text-3xl font-bold"> 
                    <Link to={`/update/${itemArg.id}`}>Update Item</Link> 
                </button>
                <button onClick={() => onDelete(itemArg.id)}  class="bg-red-600 float-left rounded-full w-1/6 text-3xl font-bold">
                   Delete Item
                </button>
                <img src={(itemArg.image) ? itemArg.image : logo} alt="" class="ml-6 float-right w-1/6 h-4/5"/>
            </div>;
}

export default ItemDataRowFuncComponent;