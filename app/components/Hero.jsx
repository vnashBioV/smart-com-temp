'use client'
import React, {useContext} from 'react'
import Link from 'next/link'
import { FaBagShopping } from "react-icons/fa6";
import Image from 'next/image';
import { urlFor } from "@/app/lib/sanity";
import { DataFetched } from '../context/DataFetched';

import {Autoplay} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const Hero = () => {
  const {heroData} = useContext(DataFetched);
  console.log("🚀 ~ Hero ~ heroData:", heroData)

  return (
    <div className='w-full bg-[#f0f0f0]'>
      <div 
        className='container flex justify-between h-[795px] pt-[7rem] mx-auto'
        id='home'
      >
        <div className='
                w-[50%] 
                flex 
                justify-center 
                items-center 
                h-full
                relative
                before:content-[""]
                before:absolute
                before:w-[300px]
                before:h-[300px]
                before:left-[10%]
                before:right-0
                before:top-[3%]
                before:bottom-0
                before:bg-primary
                before:rounded-full
                before:z-[-1]
                z-[2]
              '
        >
          <Swiper
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 2500,
            }}
            modules={[Autoplay]}
            allowTouchMove={false}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            className='w-full'
          >
              { heroData.length > 0 && heroData[0].images.map((image, i) => {
                    return (
                        <SwiperSlide
                            key={i}
                        >
                          <div className='
                                h-full 
                                flex 
                                relative
                                justify-center 
                                items-center 
                                w-[50%] 
                                mx-w-[50%] 
                              '
                            >
                              <Image 
                                src={urlFor(image).url()} 
                                width={1705} 
                                height={4483} 
                                alt="hero -image" 
                                className='w-[65%] h-[100%] object-contain'
                              />
                          </div>
                        </SwiperSlide>
                    )
                  })
                }
          </Swiper>
        </div>
        <div className='w-[50%] pb-[5rem] flex items-end justify-center flex-col h-full'>
          <div className='flex flex-col gap-7 justify-end w-[90%]'>
            <h3 className='text-[4.4rem] font-[900] leading-[71px]'>Discover Your <br  className='md:flex hidden'/> <span className='text-[#4D4C4B]'>Perfect Look</span></h3>
            <p className='text-[1rem] mt-6'>
              Unleash your inner confidence with fashion that reflects your unique 
              personality, <br className='md:flex hidden'/> elevating your style and empowering you to embrace 
              your authentic self with <br className='md:flex hidden'/> every outfit choice.
            </p>
            <Link
              href="/products"
              alt=""
              className='bg-primary group font-bold rounded-xl h-[4rem] mt-4 text-[.9rem] hover:bg-transparent transition-all hover:text-[.7rem] duration-300 flex justify-center items-center w-[13rem]'
            > 
              <FaBagShopping className='mr-4 font-bold group-hover:hidden transition-all duration-700 text-xl'/>
              <div className="w-[50px] h-[50px] mr-4 transition-all duration-700 group-hover:flex hidden">
                <Image src="/shopping-cart.png" width={512} height={512} alt="" className="w-full h-full transition-all duration-700 object-contain"/>
              </div>
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Hero
