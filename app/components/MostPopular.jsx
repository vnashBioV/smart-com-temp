'use client'
import Image from 'next/image';
import React, {useState, useContext, useEffect, useRef} from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { urlFor } from '../lib/sanity';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import Product from './Product';
import { DataFetched } from '../context/DataFetched';
import Loader from './loader/Loader';

const MostPopular = () => {

    const {productData} = useContext(DataFetched);
    const [filteredProducts, setFilteredProducts] = useState();
    const [activeFilter, setActiveFilter] = useState('women');

    const filterFnc = (category) => {
        setActiveFilter(category);
          const filteredData = productData
            .filter((product) =>
              product.categories.some((cat) => cat.name === category)
            )
            .slice(0, 4);
        setFilteredProducts(filteredData);
    };

    useEffect(() => {
        if (productData.length > 0) {
          const initialFilteredProducts = productData.filter((product) =>
            product.categories.some((cat) => cat.name === 'women')
          ).slice(0, 4);
          setFilteredProducts(initialFilteredProducts);
        }
    }, [productData]);
    
    return (
        <div className=' w-full h-[430px] bg-white relative' id="shop">
            <div className='container mx-auto px-[3rem] pt-[1.5rem] rounded-tl-[10px] rounded-tr-[10px] absolute bg-white left-0 right-0 bottom-0'>
                <div className='w-full flex justify-between items-center'>
                    <div>
                        <h3 className='text-[1.2rem] uppercase font-bold'>Most Popular</h3>
                    </div>
                </div>

                <div className='w-full mt-4 flex flex-row gap-6'>
                    <Link
                        href="/products"
                        className={`w-fit cursor-pointer px-[1.4rem] text-[.8rem] py-[.2rem] bg-primary rounded-xl`}
                    >
                        All
                    </Link>
                    <div 
                        className={`w-fit cursor-pointer px-[1.4rem] text-[.8rem] py-[.2rem] ${activeFilter === 'women' ? 'bg-black text-white' : 'bg-white'} rounded-xl border border-black`}
                        onClick={() => {
                            filterFnc("women");
                        }}
                    >
                        Women
                    </div>
                    <div 
                        className={`w-fit cursor-pointer px-[1.4rem] text-[.8rem] py-[.2rem] ${activeFilter === 'men' ? 'bg-black text-white' : 'bg-white'} rounded-xl border border-black`}
                        onClick={() => {
                            filterFnc("men");
                        }}
                    >
                        Men
                    </div>
                </div>

                <div className='w-full mt-[1.6rem] flex flex-row justify-between'>

                    {filteredProducts ? filteredProducts.map((product, i) => {
                        return(
                            <div className='w-[21%]'>
                               <Product key={i} product={product}/>  
                            </div>
                           
                        )
                    }): 
                    <div className='h-[350px] w-full flex justify-center items-center'>
                        <Loader/> 
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default MostPopular
