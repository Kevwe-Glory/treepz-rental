import React, { useState } from 'react'
import BookingForm from './BookingForm'
import Image from 'next/image'
import CustomButton from './CustomButton';

const CarList = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const openBookingForm = (car) => {
    setSelectedCar(car);
    setIsBookingOpen(true);
  }

  const closeBookingForm = () => {
    setIsBookingOpen(false);
    setSelectedCar(null);

  }

  return (
    <div className="grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 gap-6">
      {CarList.map((car, index) => (
        <div
        key={index}
        className='flex flex-col items-center p-4 border rounded-lg shadow-md'>
          <Image
          src={car.imageUrl}
          alt={car.name}
          width={20}
          height={20}
          className="w-full h-48 object-cover rounded-md"
          />
          <h3 className="mt-4 text-xl font-semibold">{car.name}</h3>
          <CustomButton 
          title='Book Now'
          containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
          textStyles='text-white text-[14px] leading-[17px] font-semibold'
          rightIcon='/right-arrow.svg'
          handleClick={() => openBookingForm(car)} 
          // handleClick={() => setIsOpen(true)}
          />
          </div>
      ))}

      {/* Booking Form Dialog */}
      {isBookingOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white rounded-lg w-full max-w-4xl p-6 relative'>
          <button
              onClick={closeBookingForm}
              className="absolute top-4 right-4 text-lg text-gray-600"
            >
              X
            </button>
            <BookingForm car={selectedCar} closeBookingForm={closeBookingForm} />
          </div>
          </div>
      )}
    </div>
  )
}

export default CarList