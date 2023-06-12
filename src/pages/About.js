import React from 'react'
import Navbar from '../layout/Navbar'
import { useState } from 'react';
import { addDoc, collection, getDoc, getDocs, query } from 'firebase/firestore';
import db from '../firebase/firebase';
import { useEffect } from 'react';

export default function About() {
    const [content , setContent]=useState("");
const [title,setTitle]=useState("");


    const getAbout=async ()=>{
      const q = query(collection(db,"aboutme"),)
      
        const querySnapshot=await getDocs(q);
        let about =[]
querySnapshot.forEach((doc)=>{
    about.push({...doc.data(),id:doc._id})
  
})
setTitle(about[0].title);
setContent(about[0].content);

        };

  useEffect(() => {
getAbout();
  
  }, [])
  


  

    return (
    <div>
<Navbar backgroundColor={1}></Navbar>

<div className='lg:px-56 px-7 mt-10 mb-7'>
    <h1 className='text-3xl mb-8 font-medium text-center text-[#002E2A]'>{title}</h1>
    <p className='text-xl text-justify '>{content}</p>
</div>
    </div>
  )
}
