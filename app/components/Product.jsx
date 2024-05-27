'use client'
import React, {useContext, useState} from 'react'
import { urlFor } from '../lib/sanity';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import Rating from '@mui/material/Rating';
import { FaBagShopping } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { DataFetched } from '../context/DataFetched';
import { CartError } from '../context/errors/cartErrors';
import { AddToCart } from '../../AddToACart'
import { useToast } from './ui/use-toast';
import Link from 'next/link';
const Product = ({product}) => {
    // console.log("🚀 ~ Product ~ product:", product.images[0].asset)
    const {setCartState} = useContext(DataFetched);
    const [error, setError] = useState('');
    const { toast } = useToast();

    const imageUrl = product.images && product.images.length > 0 
        ? urlFor(product.images[0]).url() || ''
        : '';
    
    return (
        <div className='w-full h-[346px]'>
            <div className='h-[60%] w-full rounded-xl relative bg-[#F2F2F2] p-3'>
                <div className='w-full absolute left-0 right-0 bottom-0 top-0 p-3 h-fit flex justify-end'>
                    <div 
                        onClick={() => {
                            AddToCart(product, setCartState, setError)
                            toast({
                                title: `${error ? error : "Product added to cart"}`
                            })
                        }}
                        className='w-[32px] flex hover:scale-[1.2] cursor-pointer transition-all duration-300 justify-center items-center h-[32px] bg-primary rounded-full'
                    >
                        <FaBagShopping  className='text-[.8rem]'/>
                    </div>
                    <Link
                        href={`/productDetails/${product.slug.current}`}
                        className='w-[32px] flex hover:scale-[1.2] ml-4 cursor-pointer transition-all duration-300 justify-center items-center h-[32px] bg-primary rounded-full'
                    >
                        <FaEye  className='text-[.8rem]'/>
                    </Link>
                </div>
                {product.images[0] &&
                    <Image 
                        src={imageUrl} 
                        width={2028} height={2952} 
                        alt='Item image' 
                        className='w-full h-full object-contain' 
                    />
                }
            </div>
            <div className='mt-2'>
                <p className='font-bold'>{product.name}</p>
            </div>
            <div className='w-full mt-2 flex flex-col justify-center'>
                <div className='text-[.8rem]'>
                    <Stack spacing={1}>
                        <Rating name="half-rating-read" defaultValue={product.rating} precision={0.5} readOnly />
                    </Stack>
                </div>
                <div>
                    <p className='font-bold text-[1.2rem] mt-2'>${product.price}</p>
                </div>
            </div>
        </div>
    )
}

export default Product
