'use client'
import { useContext } from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic';

//import components
import Header from './components/Header'
import Footer from './components/Footer';
import Subscription from "./components/Subscription";
import DataFetchedProvider from "../app/context/DataFetched"
import CartErrorProvider from "./context/errors/cartErrors";
import ShowCartProvider, { ShowCartContext } from "./context/ShowCart";
import { Toaster } from "../app/components/ui/toaster";
import CartSidebar from "./components/CartSideBar";

const poppins = Poppins({ 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const CartSidebarWrapper = () => {
  const { isCart } = useContext(ShowCartContext);
  return isCart ? <CartSidebar /> : null;
};

export default function RootLayout({ children }) {
    // show cart state
  return (
    <ShowCartProvider>
      <CartErrorProvider>
        <DataFetchedProvider>
          <html lang="en">
            <body className={`${poppins.variable} overflow-x-hidden relative`}>
              <Header/>
              {children}
              <Toaster/> 
              <CartSidebarWrapper/>
              <Subscription/>
              <Footer/>
            </body>
          </html>
        </DataFetchedProvider>
      </CartErrorProvider>
    </ShowCartProvider>
  );
}
