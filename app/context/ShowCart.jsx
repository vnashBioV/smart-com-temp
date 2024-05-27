"use client"
import React, {createContext, useState, useEffect} from 'react'

export const ShowCartContext = createContext()

const ShowCartProvider = ({children}) => {
    const [isCart, setIsCart] = useState(false);

    return (
        <ShowCartContext.Provider value={{
            isCart, 
            setIsCart
        }}>
            {children}
        </ShowCartContext.Provider>
    )
}

export default ShowCartProvider

