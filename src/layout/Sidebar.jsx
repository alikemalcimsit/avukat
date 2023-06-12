import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from "react-icons/ai";
import instagramLogo from '../assets/instagramLogo.png';
import twitterLogo from '../assets/twitterLogo.png';
import outlookLogo from '../assets/outlookLogo.png';
export default function Sidebar({ isSidebarOpen ,setIsSidebarOpen}) {
  const email = 'av.aysenurertan@outlook.com';
  return (
    <div className="fixed inset-0 bg-[#002E2A] z-50 text-white">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="absolute top-5 right-5 m-4">
          <AiOutlineClose onClick={()=>setIsSidebarOpen(!isSidebarOpen)} color="white" size={40}  />
        </div>
        <ul className="text-3xl">
          <Link to="/">
            <button className="cursor-pointer py-4 hover:border-b-2 duration-200">Ana Sayfa</button>
          </Link>
          <Link to="/about">
            <li className="cursor-pointer py-4  hover:border-b-2 duration-200">Hakkımda</li>
          </Link>
          <Link to="/blog">
            <li className="cursor-pointer py-4  hover:border-b-2 duration-200">Blog</li>
          </Link>
          <Link to="/randevu">
            <li className="cursor-pointer py-4  hover:border-b-2 duration-200">Randevu</li>
          </Link>
          <div className='flex gap-x-7 mt-10 items-center justify-center align-middle'>
          <a href='https://www.instagram.com/avukataysenurertan/'><img className='h-8 cursor-pointer' src={instagramLogo}></img></a>
            <a href='https://twitter.com/'><img className='h-8 cursor-pointer' src={twitterLogo}></img></a>
            <a href={`mailto:${email}`}><img className='h-8 cursor-pointer ' src={outlookLogo}></img></a>
          </div>
        </ul>
      </div>
    </div>
  );
}
