import React from 'react'
import bannerImg from "../../assets/banner/banner.jpg"

const Banner = () => {
  return (
     <div className='flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12'>
        <div className='md:w-1/2 w-full flex items-center md:justify-end'>
             <img src={bannerImg} alt="" />
         </div>
         <div className='md:w-1/2 w-full'>
         <h1 className='md:text-5xl text-2xl font-medium mb-7'>
         Recently Published Books
         </h1>
         <p className='mb-10'>
             Lorem ipsum dolor sit amet consectetur adipisicing elit. 
             Corporis accusamus perferendis tempore veritatis quae suscipit amet,
             sapiente at, eligendi laudantium atque delectus. 
             Asperiores numquam amet ipsum quibusdam repellat dolorum omnis!
         </p>

         <button className='bg-primary  px-12 py-2 rounded-md text-base font-secondary font-bold hover:bg-secondary hover:text-white transition-all duration-200 cursor-pointer'>
             Follow
             </button>
         </div>
        
       
     </div> 
    
  )
}

export default Banner



   


//     <div>
//  <div class="relative font-sans before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-50 before:z-10 bg-blue-300">


// <div class="min-h-[350px] relative z-50 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6">
// <h2 class="sm:text-4xl text-2xl font-bold mb-6">Explore the World</h2>
// <p class="sm:text-lg text-base text-center text-gray-200">Embark on unforgettable journeys. Book your dream vacation today!</p>

// <button
//   type="button"
//   class="mt-12 bg-transparent text-white text-base py-3 px-6 border border-white rounded-lg hover:bg-white hover:text-black transition duration-300">
//   Subscribe
// </button>
// </div> 
// </div>
//     </div>