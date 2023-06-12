import React, { useState } from 'react';
import Logo from '../assets/Logo.png';
import instagramLogo from '../assets/instagramLogo.png';
import twitterLogo from '../assets/twitterLogo.png';
import outlookLogo from '../assets/outlookLogo.png';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from "react-icons/ai";
import Sidebar from './Sidebar';

export default function Navbar({ backgroundColor }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const email = 'info@example.com';

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={backgroundColor ? "bg-[#002E2A]  flex  items-center  w-full justify-between h-24 lg:px-24 px-14    " :"bg-tranparent absolute flex  items-center  w-full justify-between h-24 px-14 lg:px-24 "}>
      <div className='flex items-center'>
        <Link to="/">
          <div className='flex items-center'>
          <img alt='' src={Logo} className='h-14 mr-2'></img>
        <h1 className='text-white font-thin md:text-3xl text-2xl'>Av. Ayşenur Ertan</h1>
          </div>
        
        </Link>
      
     
     
      </div>
      <div className=''>
        <ul className='navbar_items items-center relative z-50 '>
          <Link to="/">
            <button className='cursor-pointer'>Ana Sayfa</button>
          </Link>   
          <Link to="/about">
            <li className='cursor-pointer'>Hakkımda</li>
          </Link>
          <Link to="/blog">
            <li className='cursor-pointer'>Blog</li>
          </Link>
          <Link to="/randevu" >
            <li className='cursor-pointer'>Randevu</li>
          </Link>
        
          <div className='flex gap-x-4'>
            <a href='https://www.instagram.com/avukataysenurertan/'><img className='h-5 cursor-pointer' src={instagramLogo}></img></a>
            <a href='https://twitter.com/'><img className='h-5 cursor-pointer' src={twitterLogo}></img></a>
            <a href={`mailto:${email}`}><img className='h-5 cursor-pointer ' src={outlookLogo}></img></a>
          </div>
        </ul>
        <div className='flex items-center justify-center  lg:hidden  visible z-50'>
          <button  onClick={toggleSidebar}><AiOutlineMenu color='white' size="30px"></AiOutlineMenu></button >
        </div>
      </div>
      {isSidebarOpen && <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>}
    </div>
  );
}
