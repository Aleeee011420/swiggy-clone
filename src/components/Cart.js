import React from "react";
import {useSelector,useDispatch} from "react-redux";

import {clearCart} from "../constants/CartSlice";


import { FoodItem } from "./FoodItem"
console.log("inside the cart component")

export const Cart=()=>{

    const cartItems =useSelector((store)=> store.cart.items);

    const dispatch=useDispatch();

    const handleClearCart =()=>{
        dispatch(clearCart());

    }
    return(
        <div>
            <h1 classname="font-bold text-3xl">Cart-Items  - {cartItems.length}</h1>
            <button classname="py-[3px] px-[10px] text-[1.2rem] text-[#fff] bg-[#E46F20] rounded-[8px] border-none hover:bg-[#016034]"  onclick={()=> handleClearCart()}>CLEAR-CART</button>
            {cartItems.map((item)=>(
                <FoodItem key={item.id} {...item}/>
            ))}
        </div>
    )
}