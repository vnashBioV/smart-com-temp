'use client'
import React, {useContext} from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { DataFetched } from '../context/DataFetched';
import { urlFor } from "@/app/lib/sanity";
import Image from 'next/image';

const News = () => {
    const {blogData} = useContext(DataFetched);
    console.log("🚀 ~ News ~ blogData:", blogData)

    return (
        <div className='container mt-[5rem] mx-auto' id="blog">
        <div className='w-full'>
            <p className='font-[600] text-[2.5rem]'>Latest News</p>
            <div className='w-full flex justify-between mt-[1rem]'>
                {blogData.length > 0 && blogData.map((blog) => (
                    <div className='w-[24%] h-[500px]'>
                        <div className="p-6 h-[60%] flex flex-col justify-end bg-cover w-full border relative z-[1] rounded-xl bg-[grey] before:content-[''] before:absolute before:rounded-xl before:z-[-1] before:bg-black/30 before:top-0 before:bottom-0 before:left-0 before:right-0 before:w-full before:h-full ">
                            <Image src={urlFor(blog.image).url()} width={321} height={300} alt="blog image" className="absolute top-0 left-0 bottom-0 rounded-xl z-[-2] w-full h-full object-cover"/>
                            <div className='w-full flex justify-start'>
                                <div className='px-[1.2rem] w-fit py-[.3rem] text-[.9rem] cursor-pointer rounded-xl flex justify-center items-center bg-primary text-black mt-[2rem]'>2024-05-12</div>
                            </div>
                        </div>
                        <div className='w-full mt-3'>
                            <p className='text-[1rem] leading-[22px] font-[600]'>{blog.title}</p>
                        </div>
                        <div className='w-full mt-3'>
                            <p className='text-[.8rem] leading-[20px] text-[#4d4d4d] blog-body'>{blog.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    )
}

export default News
