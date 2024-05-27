'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import Nav from './Nav'
import MobileNav from './MobileNav'
import Link from 'next/link'
import { DataFetched } from '../context/DataFetched';

const Header = () => {

  const [scroll, setScroll] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header>
      {/* Desktop Navigation Menu */}
      <div className='hidden w-full  z-[999] h-fit md:flex transition-all duration-300 fixed top-0'>
        <div className='bg-white container flex flex-row justify-between items-center h-fit mx-auto py-2 px-10 rounded-bl-[40px] rounded-br-[40px]'>
          <Link 
            href="/"
            className=' w-[100px] transition-all duration-300 h-[100px] p-[.6rem] rounded-full'
          >
              <Image src={'/logo.svg'} alt='logo' width={198} height={150} className='w-full h-full object-contain'/>
          </Link>
          <div className='flex transition-all duration-300 w-fit h-[90px] justify-end'>
            <Nav containerStyles="flex justify-between items-center gap-[3rem]" linkStyles="w-fit flex justify-center items-center !no-underline"/>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className='md:hidden w-full fixed left-0 right-0 bottom-0 top-0 h-full z-[999] pointer-events-none flex flex-col items-end'>
        <div className={`p-8 flex w-[70%] ${isActive && "bg-black"} justify-end items-center`}>
          <button 
            className='h-[4rem] w-[4rem] pointer-events-auto rounded-full transition-all duration-300 bg-[#455ce9]'
            onClick={() => setIsActive(!isActive)}
          >
            <div className='grid justify-items-center gap-1.5'>
              <span className={`h-[.15rem] w-8 rounded-full ${isActive && "rotate-45 translate-y-[0.50rem]"}  transition-all duration-300 bg-white`}></span>
              <span className={`h-[.15rem] w-8 rounded-full ${isActive && "rotate-45 scale-x-0"} transition-all duration-300 bg-white`}></span>
              <span className={`h-[.15rem] w-8 rounded-full ${isActive && "-rotate-45 -translate-y-[0.50rem]"} transition-all duration-300 bg-white`}></span>
            </div>
          </button>
        </div>
        {isActive &&
          <div className='w-[70%] h-full bg-black'>
            <div className='px-[5rem] '>
              <MobileNav setIsActive={setIsActive}/>
            </div>
          </div>
        }
      </div>
    </header>
  )
}

export default Header
