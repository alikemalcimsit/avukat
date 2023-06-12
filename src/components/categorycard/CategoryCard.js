import React from 'react'


export default function CategoryCard({description}) {
  return (
    <div>
      <div className=' md:h-24 md:w-44 mb-4 md:mb-0   h-14 lg:h-28  lg:w-48 w-[85px] text-center flex justify-center items-center bg-[#DDDEE6]'>
<h1 className='lg:text-xl text-xs '>{description}</h1>
      </div>
    </div>
  )
}
