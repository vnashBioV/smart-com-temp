'use client'
import React, {useContext, useState, useRef, useEffect } from 'react';
import { Link } from 'react-scroll';
import { useMediaQuery } from 'react-responsive';
import NextLink  from 'next/link';
import { CiSearch } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { DataFetched } from '../context/DataFetched';
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import { urlFor } from '../lib/sanity';
import { usePathname } from 'next/navigation'; 
import CartSidebar from './CartSideBar'; 
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"

// Array of link items
const links = [
    {
        path: 'home',
        name: 'Home',
    },
    {
        path: 'shop',
        name: 'Shop',
    },
    {
        path: 'blog',
        name: 'Blog',
    },
];

const Nav = ({containerStyles, linkStyles}) => {
    // cart
    const {cartState} = useContext(DataFetched);

    // all products for research purposes
    const {productData} = useContext(DataFetched);
    
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [showSearchInput, setShowSearchInput] = useState(false);
    const inputRef = useRef(null);
    const pathname = usePathname();

    // Checking if the current path is the products page to hide the nav links as they are react-responsive links
    const isProductsPage = pathname === '/products' || pathname === '/productDetails/';

    // put focus on the input
    useEffect(() => {
      if (showSearchInput && inputRef.current) {
        inputRef.current.focus();
      }
    }, [showSearchInput]);

    const handleCartClick = () => {
      setIsCart(true);
    };

    // Media query hook to determine if it's desktop or not
    const isDesktop = useMediaQuery({
        query: '(min-width: 1310px)',
    });

    useEffect(() => {
      if (searchQuery) {
        const results = productData.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.categories.some(cat => cat.name.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setFilteredResults(results);
      } else {
        setFilteredResults([]);
      }
    }, [searchQuery, productData]);

    const router = useRouter()

    return (
      <nav className={`${containerStyles}`}>
        {!isProductsPage &&
          <div className='flex justify-between items-center gap-3'>
            {links.map((link, index) => {
              return (
                  <Link
                      to={link.path} 
                      className={`${linkStyles} cursor-pointer ml-[1rem] font-[400] text-black hover:tracking-wide text-[.9rem] hover:font-bold transition-all duration-300`}
                      key={index}
                      smooth={!isDesktop ? false : true}
                      spy
                      offset={-50}
                      activeClass='active'
                  >
                    {link.name}
                  </Link>
              )
            })}
          </div>
        }

        <div className='ml-[2.5rem] gap-6 w-fit rounded-full flex justify-center items-center bg-transparent'>
            <div className={` transition-all h-[42px] duration-300 ${showSearchInput ? "scale-[1]" : "scale-0"} border rounded-[25px] w-[13rem] bg-[#f2f2f2]`}>
              <input 
                type="text" 
                ref={inputRef} 
                className='h-full w-full px-[1rem] text-[.8rem] outline-none rounded-full border-none' 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery &&
                <div 
                  className="scrollbar absolute mt-3 left-0 bottom-0 right-0 bg-white p-6 top-[100%] w-[300px] h-[600px] max-h-[600px] overflow-scroll overflow-x-hidden"
                >
                  {filteredResults.length > 0 ? (
                    filteredResults.map((product) => (
                      <div 
                        key={product.id} 
                        className="search-result-item pb-3 cursor-pointer flex items-center border-b-[1px] mb-3"
                        onClick={() => {
                            router.push(`/productDetails/${product.slug.current}`)
                            setSearchQuery("")
                        }}
                      >
                        <div className='w-[60px] h-[60px] mr-3 border rounded-full'>
                          <Image 
                            src={urlFor(product.images[0]).url()} 
                            alt='search results image'
                            width={100}
                            height={100}
                            className='w-full h-full rounded-full object-contain'
                          />
                        </div>
                        <div>
                          <p>{product.name}</p>
                          <p className='text-[.9rem]'>${product.price}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    searchQuery && <p>No results found</p>
                  )}
                </div>
              }
            </div>
            
            <div 
              onClick={() => setShowSearchInput(!showSearchInput)}
              className='w-[42px] flex justify-center hover:bg-primary/50 duration-300 transition-all relative cursor-pointer items-center h-[42px] bg-primary rounded-full'
            >
              <CiSearch className='text-[1.1rem]'/>
            </div>

            <Sheet>
              <SheetTrigger>
                <div 
                  className='w-[42px] cursor-pointer hover:bg-primary/50 duration-300 transition-all flex justify-center relative items-center h-[42px] bg-primary rounded-full'
                  variant="outline"
                >
                  <FaShoppingCart  className='text-[1rem]'/>
                  <div className='absolute w-[1rem] h-[1rem] top-0 right-[-.4rem] text-[.8rem] rounded-full bg-black text-white flex justify-center items-center'>{cartState.length}</div>
                </div>
              </SheetTrigger>
              <CartSidebar/>
            </Sheet>
            
            <div className='w-[42px] flex justify-center items-center h-[42px] bg-[#F1DD23] rounded-full'>
              <Image 
                src="https://images.pexels.com/photos/2829373/pexels-photo-2829373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                width={42} 
                height={42}
                className='w-full h-full object-cover rounded-full'
              />
            </div>
        </div>
      </nav>
    );
  };

export default Nav;
