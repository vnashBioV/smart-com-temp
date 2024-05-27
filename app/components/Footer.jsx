'use client'
import React from 'react'
import { MdMarkEmailRead } from "react-icons/md";
import { IoCallSharp } from "react-icons/io5";
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className='w-full bg-black z-[999]'>
      <div className='container mx-auto py-[4rem] flex justify-between'>
        <div className='w-[20%] flex justify-center'>
          <Link
              href="#"
              className='transition-all h-fit w-[20%] duration-300'
            >
            <Image src={'/logo.svg'} alt='logo' width={42} height={35} className='w-[100%] object-contain'/>
          </Link>
        </div>

        <div className='w-[40%] flex justify-center'>
          <div className='w-[50%] gap-3 flex flex-col'>
            <p className='text-[1rem] font-bold text-white'>Information</p>
            <Link
                href="#"
                className='transition-all text-[.8rem] text-white h-fit duration-300'
              > 
                Help
            </Link>
            <Link
                href="#"
                className='transition-all text-[.8rem] text-white h-fit duration-300'
              > 
                Track order
            </Link>
            <Link
                href="#"
                className='transition-all text-[.8rem] text-white h-fit duration-300'
              > 
                Delivery & returns
            </Link>
          </div>
          <div className='w-[50%] gap-3 flex flex-col'>
            <p className='text-[1rem] font-bold text-white'>About SmartCom</p>
            <Link
                href="#"
                className='transition-all text-[.8rem] text-white h-fit duration-300'
              > 
                About us
            </Link>
            <Link
                href="#"
                className='transition-all text-[.8rem] text-white h-fit duration-300'
              > 
                Careers
            </Link>
            <Link
                href="#"
                className='transition-all text-[.8rem] text-white h-fit duration-300'
              > 
                Partners
            </Link>
          </div>
        </div>
        
        <div className='flex-grow gap-8 flex justify-center items-center'>
          <Link
              href="#"
              className='transition-all text-white h-fit duration-300'
          > 
              <FaFacebook className='text-[1.6rem]'/>
          </Link>
          <Link
              href="#"
              className='transition-all text-white h-fit duration-300'
            > 
              <FaXTwitter className='text-[1.6rem]'/>
          </Link>
          <Link
              href="#"
              className='transition-all text-white h-fit duration-300'
            > 
              <FaInstagram className='text-[1.6rem]'/>
          </Link>
        </div>
      </div>
      <div className='container mx-auto h-[50px] flex flex-col xl:flex-row xl:mb-0 mb-4 justify-between gap-4 items-center'>
        <p className='text-white text-[.85rem]'>Copyright © {date} SmartCom All Rights Reserved</p>
        <div className='flex justify-center items-center'>
          <Link
            href="#"
            className='transition-all text-white h-fit duration-300'
          >
            <p className='text-white text-[.85rem] font-[600]'>Terms of Service</p>
          </Link>
          <Link
            href="#"
            className='transition-all text-white h-fit duration-300'
          >
            <p className='text-white text-[.85rem] ml-4 font-[600]'>Privacy Policy</p>
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
