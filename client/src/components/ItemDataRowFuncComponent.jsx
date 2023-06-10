import logo from '../logo.svg';
import { Link } from 'react-router-dom';

const ItemDataRowFuncComponent = ({ itemArg, onItemDelete }) => {

    return <div key={itemArg.id} class="bg-blue-600 m-5 p-4 rounded-3xl flex justify-evenly">
                <div class="float-left mr-10 text-2xl bg-blue-500 rounded-3xl p-4 w-auto">
                    <div class="mb-4"> Item name: {itemArg.title} </div>
                    <div class="mb-4"> Customer name: {itemArg.customer_name} </div>
                    <div class="mb-4"> Goods location: {itemArg.location} </div>
                </div>
                <Link to={`/update/${itemArg.id}`}  class="inline-block text-center bg-amber-500 rounded-full w-1/6 h-20 my-12">
                    <p class="leading-loose p-2 text-3xl font-bold ">Update Item</p>
                </Link> 
                <button onClick={() => onItemDelete(itemArg.id)}  class="bg-red-600 float-left rounded-full w-1/6 text-3xl font-bold h-20 my-12">
                   Delete Item
                </button>
                <img src={itemArg.image_src || logo} alt="" class="ml-6 float-right w-1/6"/>
            </div>;
}

export default ItemDataRowFuncComponent;