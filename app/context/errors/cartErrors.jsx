"use client"
import React, {createContext, useState, useEffect} from 'react'

export const CartError = createContext()

const CartErrorProvider = ({children}) => {
    const [cartErrorMesaage, setCartErrorMesaage] = useState("");
    return (
        <CartError.Provider value={{
            cartErrorMesaage, 
            setCartErrorMesaage
        }}>
            {children}
        </CartError.Provider>
    )
}

export default CartErrorProvider
