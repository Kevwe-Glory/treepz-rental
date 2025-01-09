'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import { AllVehicles } from '@/lib/authApi';
import { CarProps } from '@/types';
import { StarIcon } from '@heroicons/react/20/solid';

const AboutUs = () => {
  const [fleets, setFleets] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchFleets = async () => {
      try {
        const response = await AllVehicles('');

        if (response?.data?.data?.vehicles && Array.isArray(response.data.data.vehicles)) {
          const fleetData = response.data.data.vehicles;
          setFleets(fleetData);
          setError('');
        } else {
          setError('No vehicles found');
        }
      } catch (err: any) {
        setError('Failed to fetch fleet data');
      } finally {
        setLoading(false);
      }
    };

    fetchFleets();
  }, []);

  const categorizeCars = (cars: CarProps[]) => {
    const categories = {
      coaster: cars.filter(car => car.make.toLowerCase() === 'coaster'),
      regular: cars.filter(car => car.make.toLowerCase() === 'regular'),
      luxury: cars.filter(car => car.make.toLowerCase() === 'luxury'),
      others: cars.filter(car => !['coaster', 'regular', 'luxury'].includes(car.make.toLowerCase())),
    };
    return categories;
  };

  const testimonials = [
    {
      name: 'Abdallah Ssendi,',
      role: 'Procurement and Admin, Opportunity Bank',
      message: "Using Treepz has significantly reduced the stress of car rentals for us. The service delivery has been good and so far we haven't had any major issues of concern",
      image: '/opportunity-bank.png',
      rating: 5,
    },
    {
      name: 'Oluwadunni Fanibe,',
      role: 'Techstars Lagos Program Manager.',
      message: 'Treepz made our Techstars Lagos program unforgettable by providing top-notch transportation for our tech startup founders and CEOs. The buses were modern, clean, and the entire process was efficient. Treepz exceeded our expectations, and we look forward to future collaborations!.',
      image: '/brighter-money.png',
      rating: 4,
    },
    {
      name: 'Joanita,',
      role: 'Administration Officer, Liberty Life Assurance',
      message: 'Our experience with Treepz car rentals has been exceptional. The quality of vehicles deployed and drivers who are knowledgeable about various destinations is impressive. Thank you for making our field movements a pleasant experience!',
      image: '/liberty.png',
      rating: 3.5,
    },
  ];

  const renderStars = (rating: number) => {
    const stars = [];

    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(<StarIcon key={`full-${i}`} className='h-5 w-5 text-[#F8B02B]' />)
    }

    if (rating % 1 >= 0.5) {
      stars.push(<StarIcon key="half" className="h-5 w-5 text-[#F8B02B] opacity-50" />);
    }

    for (let i = stars.length; i < 5; i++) {
      stars.push(<StarIcon key={`empty-${i}`} className="h-5 w-5 text-gray-300" />);
    }

    return stars;
  }

  const categorizedFleets = categorizeCars(fleets);

  return (
    <div className="mt-8">
      <section
        className="container mx-auto py-16 px-6 text-center relative">
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto space-x-4">
        <div className="lg:w-1/2 mt-8 lg:mt-0">
        <Image
              src="/herol.png" // Replace with the path to your image
              alt="Mission Image"
              width={900}
              height={300}
              className="object-cover rounded-lg shadow-lg"
            />
        </div>
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-semibold text-black mb-4">About Treepz</h2>
            <p className="text-lg text-black max-w-3xl mx-auto">
              Treepz is a leading provider of seamless transportation services, focused on delivering
              safe, reliable, and affordable travel solutions. We are committed to providing exceptional
              experiences, backed by excellent customer support, for individuals and businesses alike.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-200">
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto space-x-4">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Our mission at Treepz is to revolutionize the travel and transportation industry by
              offering innovative solutions that prioritize safety, convenience, and sustainability.
              We are dedicated to connecting people with efficient, eco-friendly, and cost-effective travel
              options across the globe.
            </p>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <Image
              src="/herol.png" 
              alt="Mission Image"
              width={500}
              height={300}
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto py-16 px-6 text-center">
        <h2 className="text-4xl font-semibold text-gray-800 mb-8">Our Car Fleets</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          Treepz offers a wide variety of vehicles to cater to different needs, from business travel to family vacations. Here is a glimpse of our diverse fleet:
        </p>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} height={200} />
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : fleets.length === 0 ? (
          <p>No fleets available at the moment.</p>
        ) : (
          <div>
            {/* Coasters */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Coasters</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {categorizedFleets.coaster.slice(0, 6).map((fleet, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <Image
                    src={fleet.image}
                    alt={`Image of a ${fleet.make} by ${fleet.make}`}
                    width={500}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800">{fleet.make}</h3>
                    <p className="text-gray-600">{fleet.make}</p>
                    <p className="text-gray-600">{fleet.garageLocation}</p>
                    <p className="text-gray-600">{fleet.passengerCapacity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Regular Cars */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Regular Cars</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {categorizedFleets.regular.slice(0, 6).map((fleet, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <Image
                    src={fleet.image}
                    alt={`Image of a ${fleet.make} by ${fleet.make}`}
                    width={500}
                    height={300}
                    className="w-full h-64 object-cover"
                    layout="intrinsic"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800">{fleet.make}</h3>
                    <p className="text-gray-600">{fleet.make}</p>
                    <p className="text-gray-600">{fleet.garageLocation}</p>
                    <p className="text-gray-600">{fleet.passengerCapacity}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Luxury Cars */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Luxury Cars</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categorizedFleets.luxury.slice(0, 6).map((fleet, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <Image
                    src={fleet.image}
                    alt={`Image of a ${fleet.make} by ${fleet.make}`}
                    width={500}
                    height={300}
                    className="w-full h-64 object-cover"
                    layout="intrinsic"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800">{fleet.make}</h3>
                    <p className="text-gray-600">{fleet.make}</p>
                    <p className="text-gray-600">{fleet.garageLocation}</p>
                    <p className="text-gray-600">{fleet.passengerCapacity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="container mx-auto py-16 px-6 text-center">
        <h2 className="text-4xl font-semibold text-gray-800 mb-8">What Our Clients Say</h2>
        <div className="flex flex-wrap justify-center gap-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="text-center max-w-xs w-full md:w-1/3 lg:w-1/4 xl:w-1/5">
              <div className="mb-4 ">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={120}
                  height={120}
                  className="rounded-full mx-auto"
                />
                
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
              <p className="text-sm text-gray-500">{testimonial.role}</p>

              {/* Rating Stars */}
              <div className="flex justify-center mt-2" aria-label={`${testimonial.rating} stars`}>
                {renderStars(testimonial.rating)}
              </div>

              <p className="text-gray-600 mt-4 px-4 text-sm md:text-base">{testimonial.message}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
