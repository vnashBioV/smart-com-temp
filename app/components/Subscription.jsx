import React from 'react'

const Subscription = () => {
  return (
    <div className='w-full mt-[5rem] mx-auto z-[9999999] py-[4rem] bg-[#000000]'>
        <div className='w-full flex justify-center items-center'>
            <p className="capitalize leading-tight text-white font-bold text-[2rem] mb-2">Subscribe to our newsletter</p>
        </div>
        <div className='w-full mt-8 flex justify-center items-center'>
            <div className='flex justify-between items-center w-[30%] rounded-xl h-[3rem] bg-[#3b3b3b]'>
                <input type="text" placeholder='example@mail.com' className='px-6 text-white flex-grow outline-none border-none h-full bg-[#3b3b3b] rounded-l-xl'/>
                <div className='px-[2.6rem] w-fit h-full cursor-pointer rounded-xl flex justify-center items-center font-[500] bg-primary text-black'>Submit</div>
            </div>
        </div>
    </div>
  )
}

export default Subscription
