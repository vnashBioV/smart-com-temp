'use client'
import React, {useContext, useState, useEffect} from 'react'
import { client, urlFor } from "../../lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { AddToCart } from '../../../AddToACart'
import { useToast } from '../../components/ui/use-toast';
import { DataFetched } from '../../context/DataFetched';

import {
    Clock,
    PackageCheck,
    RefreshCw,
    ChevronLeft
} from "lucide-react"

import Loader from '@/app/components/loader/Loader';

const ProductDetails = ({params}) => {
    // const product = await getData(params.slug);
    const [product, setProduct] = useState(null);
    const [error, setError] = useState('');
    const { toast } = useToast();
    const {setCartState} = useContext(DataFetched);
    
    useEffect(() => {
        const getData = async (slug) => {
            const query = `*[_type == 'product' && slug.current == '${slug}'][0] {
                    ...,
                    categories[]->{
                    name
                }
            }`;
            const data = await client.fetch(query);
            return data;
        };

        getData(params.slug).then((data) => {
            setProduct(data);
        }).catch((error) => {
            // Handle error
            console.error('Error fetching product data:', error);
        });
    }, [params.slug]);

    console.log("🚀 ~ ProductDetails ~ product:", product)
    return (
        <section className="pb-18 pt-40">
            <div className="container mx-auto relative">
                {product ? (
                    <div className="flex flex-col xl:flex-row gap-14">
                        {/* img */}
                        <div className="xl:flex-1 h-[460px] rounded-[2rem] bg-[#F2F2F2] xl:w-[700px] xl:h-[540px] flex justify-center items-center">
                                <div className='w-[50%] h-[70%]'>
                                    <Image 
                                        src={product ? urlFor(product?.images[1])?.url() : ""} 
                                        width={473}
                                        height={290}
                                        priority
                                        alt=""
                                        className='object-contain h-full w-full'
                                    /> 
                                </div>
                                          
                        </div>
                        {/* text */}
                        <div className=" flex-1 flex flex-col justify-center items-start gap-10">
                            <Link href='/' className="flex items-center gap-2 font-semibold">
                                <ChevronLeft size={20}/>
                                Back to home
                            </Link> 
                            <div className="flex flex-col gap-6 items-start">
                                <div>
                                    <h3>{product?.name}</h3>   
                                    <p className="text-lg font-semibold">${product?.price}</p> 
                                </div>
                                <p>{product?.description}</p>
                                <div 
                                    className="flex justify-center items-center h-[50px] px-8 font-semibold bg-primary cursor-pointer hover:bg-[#ffe184] rounded-xl text-black"
                                    onClick={() => {
                                    if(product){
                                        AddToCart(product, setCartState, setError)
                                        toast({
                                            title: `${error ? error : "Product added to cart"}`
                                        })
                                    }
                                    }}
                                >
                                    Add to Cart
                                </div>
                            </div>
                            {/* info */}
                            <div className=" flex flex-col gap-3">
                                <div className="flex gap-2">
                                    <PackageCheck 
                                        size={20}
                                        className="text-accent"
                                    />
                                    <p>Free shipping on orders over $130</p>
                                </div>
                                <div className="flex gap-2">
                                    <RefreshCw 
                                        size={20}
                                        className="text-accent"
                                    />
                                    <p>Free return for 30 days</p>
                                </div>
                                <div className="flex gap-2">
                                    <Clock 
                                        size={20}
                                        className="text-accent"
                                    />
                                    <p>Fast delivery</p>
                                </div>
                            </div>
                        </div>
                    </div>
                  ): 
                  <div className='h-[500px] w-full flex justify-center items-center'>
                    <Loader/>
                  </div>
                }
            </div> 
        </section>
    )
}

export default ProductDetails
