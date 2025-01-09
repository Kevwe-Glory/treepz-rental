import React from 'react'
import BookingForm from './BookingForm'

const Hero = () => {
  return (
    <div className='relative h-screen flex flex-col items-center justify-between' 
      style={{
        backgroundImage: 'url("/hero.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className='absolute inset-0 bg-black opacity-40'></div> 
      
      <div className='relative text-center z-10 mt-16'>
        <h2 className='text-3xl font-bold  text-white mb-8'>
          Ride Smarter with Treepz
        </h2>
        <p className='text-xl text-white font-bold'>Treepz is an all-in-one transportation solution for all your transportation needs - from commuter shuttling, executive VIP transportation, and large-scale events..</p>
      </div>

      <div className='relative z-10 mb-8 w-full max-w-4xl'>
        <BookingForm />
      </div>
    </div>
  )
}

export default Hero
