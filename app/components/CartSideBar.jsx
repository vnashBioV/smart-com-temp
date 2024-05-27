'use client'
import CartItems from "./CartItems"
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { ScrollArea } from "./ui/scroll-area"
import { DataFetched } from '../context/DataFetched';
import React, {useContext, useState, useRef, useEffect } from 'react';
import CheckoutBtn from "./CheckoutBtn";

const CartSidebar = () => {
  const {cartState, setCartState} = useContext(DataFetched);
  console.log("🚀 ~ CartSidebar ~ cartState:", cartState)

  const incrementItem = (itemId) => {
    setCartState((prevCartState) =>
        prevCartState.map((item) =>
            item._id === itemId ? { ...item, cartQuantity: item.cartQuantity + 1 } : item
        )
    );
  };

  const decrementItem = (itemId) => {
    setCartState((prevCartState) =>
        prevCartState.map((item) =>
            item._id === itemId && item.cartQuantity > 1
                ? { ...item, cartQuantity: item.cartQuantity - 1 }
                : item
        )
    );
  };

  const removeItem = (itemId) => {
    setCartState((prevCartState) =>
        prevCartState.filter((item) => item._id !== itemId)
    );
  };

  const calculateTotalPrice = () => {
    return cartState.reduce((total, item) => {
      return total + item.cartQuantity * item.price;
    }, 0);
  };

  const totalPrice = calculateTotalPrice();

  const cartCount = cartState ? cartState.length : 0;

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>MY SHOPPING CART({cartState ? cartState.length : 0})</SheetTitle>
        <SheetDescription>
        {cartCount === 0 ? 
            <div className="flex flex-col items-center justify-center w-full h-[760px]">
              <h5 className="text-black/50">Your cart is empty</h5>
            </div> 
            : (
            <ScrollArea className="h-[70vh] xl:h-[74vh] pr-4 mb-4">
              {cartState && cartState.map((item, i) => {
                  return (
                    <>
                      <CartItems 
                        item={item} 
                        key={i}
                        incrementItem={incrementItem}
                        decrementItem={decrementItem}
                        removeItem={removeItem}
                      />
                    </>
                  )
              })}
            </ScrollArea>
        )}
        {cartCount > 0 && (
          <div>
              <div className="flex justify-between text-[1.2rem] text-black font-semibold">
                <div className="uppercase mb-5">Total</div>
                <div>${totalPrice}</div>
              </div>
              <CheckoutBtn />
          </div>
        )}
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  )
}

export default CartSidebar
