import React from 'react'
import { Link } from 'react-scroll';

const MobileNav = ({setIsActive}) => {
    // Array of link items
    const links = [
        {
            path: 'home',
            name: 'Home',
        },
        {
            path: 'about',
            name: 'About us',
        },
        {
            path: 'services',
            name: 'Services',
        },
        {
            path: 'posts',
            name: 'Posts',
        },
        // {
        //     path: 'store',
        //     name: 'Store',
        // },
        {
            path: 'contact',
            name: 'Contact',
        },
    ];
    return (
        <nav className='flex flex-col  gap-3 border-t-[1px] pt-6'>
            {links.map((link, index) => {
            return (
                <Link 
                    to={link.path} 
                    className='text-white pointer-events-auto text-[1.3rem] w-fit'
                    key={index}
                    smooth={true}
                    spy
                    offset={-50}
                    activeClass='active'
                    onClick={() => {
                        
                        setTimeout(() => {
                            setIsActive(false)
                        }, 2000)
                    }}
                >
                    {link.name}
                </Link>
            )
            })}
        </nav>
    )
}

export default MobileNav
