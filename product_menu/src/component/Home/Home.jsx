import React, { useEffect, useState } from 'react'
import ProductCard from '../Product/ProductCard'
import logo from '../../../public/Photo/digibox_logo_login.jpg'

export default function Home() {
   const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <>
        <div className='bg-amber-500 h-16 w-full flex justify-between items-center md:px-20 px-5'>
            {/* <h1 className='text-white text-2xl font-bold '>Digibox Demo1</h1> */}
            <img src={logo} alt="logo" className='w-40 md:w-64 md:h-10 h-9' />
            <div className='text-white text-md md:text-xl flex'>
                <p className='px-2 md:px-3'>{currentDateTime.toLocaleTimeString()}</p>
                 <p>{formatDate(currentDateTime)}</p>
            </div>
          </div>  
            <div className='md:px-20 px-5 py-10 w-full h-full'>
              <ProductCard/>
            </div>
    </>
  )
}
