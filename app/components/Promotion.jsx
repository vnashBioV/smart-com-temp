import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
const Promotion = () => {
  return (
    <div className='w-full mt-[5rem] rounded-xl overflow-hidden container mx-auto flex justify-between items-center h-[350px]'>
        <div className="w-[45%] px-12 rounded-tl-xl rounded-bl-xl h-full bg-[url('/woman-denim.jpg')] bg-cover flex items-center justify-start">
            <div className='w-[40%]'>
              <p className='font-bold text-[1.7rem]'>Discover Indigo Eternal Love for Denim</p>
              <Link 
                href="/products"
                className='px-[2.6rem] w-fit py-[.6rem] cursor-pointer rounded-xl flex justify-center items-center bg-black text-white mt-[4rem]'

              >
                  Explore
              </Link>
            </div>
        </div>
        <div className='w-[55%] h-full flex bg-primary rounded-tr-xl rounded-br-xl'>
            <div className='w-[50%] h-full'>
                <Image src="/man-jacket.png" width={521} height={612} alt='' className='w-full h-full object-cover' />
            </div>
            <div className='w-[50%] h-full px-12 flex justify-end items-center'>
              <div className='w-[100%] flex justify-end flex-col items-end'>
                <p className='font-bold text-[1.7rem] text-end'>Men’s Jackets Collection</p>
                <p className='font-bold text-[3rem] text-end mt-[3rem]'>40% OFF </p>
                <Link 
                  href="/products"
                  className='px-[2.6rem] w-fit py-[.6rem] cursor-pointer rounded-xl flex justify-center items-center bg-black text-white mt-[2rem]'
                >
                  Discover
                </Link>
              </div>
            </div>  
        </div>
    </div>
  )
}

export default Promotion
