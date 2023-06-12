import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import db from '../../firebase/firebase';

export default function Blog({ content, title, created_at, photoUrls }) {
  return (
    <div className="w-full md:max-w-sm  p-6 mb-5  lg:h-[650px] border-2 overflow-hidden shadow-lg">
    <img className="w-full rounded-lg h-80 mb-4 object-cover" src={photoUrls[0]} alt={title} />
    <span className="text-sm text-gray-500  ">{created_at}</span>
    <div className="flex-col">
      <div className="font-bold text-xl mb-2 mt-4">{title}</div>
      <p className="text-gray-700 text-base overflow-hidden line-clamp-4">{content}</p>
      <div className="mt-4">
        
        <button className=" px-3 py-2 text-sm font-semibold text-white bg-[#002E2A]/90 rounded-lg hover:bg-[#002E2A]">Devamını Oku</button>
      </div>
    </div>
  </div>
  );
}
