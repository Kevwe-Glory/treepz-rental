'use client';

import { Listbox } from '@headlessui/react';
import { AllVehicles } from '@/lib/authApi';
import { CarProps } from '@/types';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import CustomButton from '@/components/CustomButton';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const titles = ['Mr.', 'Mrs.', 'Miss', 'Dr.', 'Prof.'];

const CarCard = ({ car, onSelect }: { car: CarProps; onSelect: () => void }) => (
  <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white transition-all hover:scale-105 mb-6">
    <Image
      src={car.image}
      alt={car.make}
      width={100}
      height={100}
      className="w-full h-56 object-cover rounded-lg"
    />
    <h4 className="text-lg font-semibold mt-2">{car.make}</h4>
    <p className="text-gray-700">{car.make}</p>
    <p className="text-gray-500">{car.passengerCapacity} Passengers</p>
    <div className="flex justify-between items-center mt-4">
      <button
        onClick={onSelect}
        className="bg-[#F8B02B] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#e66c00] transition-all"
      >
        Select Car
      </button>
    </div>
  </div>
);

const MyBooking = () => {
  const [bookingData, setBookingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCar, setSelectedCar] = useState<CarProps | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [passengerCount, setPassengerCount] = useState(1);
  const [allCars, setAllCars] = useState<CarProps[]>([]);
  const [filteredCars, setFilteredCars] = useState<CarProps[]>([]);
  const [noCarsMessage, setNoCarsMessage] = useState('');
  const [userDetails, setUserDetails] = useState({
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [isPersonalDetailsPage, setIsPersonalDetailsPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 6;
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const searchParams = useSearchParams();

  // Parse booking data from URL params
  useEffect(() => {
    const data = searchParams.get('bookingData');
    if (data) {
      const parsedData = JSON.parse(data);
      setBookingData(parsedData);
    }
  }, [searchParams]);

  // Fetch vehicles on load
  useEffect(() => {
    fetchVehicles();
  }, []);

  // Update filtered cars based on passenger count
  useEffect(() => {
    if (passengerCount > 0) {
      const filtered = allCars.filter(
        (car) => car.passengerCapacity === passengerCount.toString()
      );
      setFilteredCars(filtered);
      setNoCarsMessage(
        filtered.length === 0
          ? 'No cars match the specified passenger capacity.'
          : ''
      );
    } else {
      setFilteredCars(allCars);
      setNoCarsMessage('');
    }
  }, [passengerCount, allCars]);

  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    setNoCarsMessage('');
    try {
      const response = await AllVehicles('');
      const vehicles = response?.data?.data?.vehicles;

      if (vehicles && Array.isArray(vehicles)) {
        setAllCars(vehicles);
        setFilteredCars(vehicles);
      } else {
        setNoCarsMessage('Failed to fetch vehicles at the moment.');
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      setNoCarsMessage('An error occurred while fetching vehicles.');
    } finally {
      setLoading(false);
    }
  }, []);

  const selectCar = (car: CarProps) => {
    setSelectedCar(car);
  };

  const handleSubmit = async () => {
    const { title, firstName, lastName, email, phone } = userDetails;
    if (!title || !firstName || !lastName || !email || !phone) {
      alert('Please fill in all the personal details fields.');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!validatePhone(phone)) {
      alert('Please enter a valid phone number.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/confirm-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          car: selectedCar,
          userDetails,
          bookingData: {
            ...bookingData,
            returnPickupLocation: bookingData?.returnPickupLocation,
            returnDestinationLocation: bookingData?.returnDestinationLocation,
            returnDate: bookingData?.returnDate,
            returnTime: bookingData?.returnTime,
          },
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccessModalOpen(true); 
        resetForm();
      } else {
        console.error('Booking failed:', result.message);
        alert(`Booking failed: ${result.message || 'Unknown error.'}`);
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('An error occurred while processing your booking. Please try again.');
    } finally {
      setSubmitting(false);
      setIsPersonalDetailsPage(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedCars = useMemo(
    () => filteredCars.slice((currentPage - 1) * carsPerPage, currentPage * carsPerPage),
    [currentPage, filteredCars]
  );

  const handleCarSelect = (car: CarProps) => {
    setSelectedCar(car);
  };

  // Helper Functions
  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone: string) => /^[0-9]{10}$/.test(phone);

  const resetForm = () => {
    setSelectedCar(null);
    setUserDetails({
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    });
    setIsPersonalDetailsPage(false);
    setBookingData(null);
    setCurrentPage(1);
  };

  return (
    <div className="flex w-full mt-6 pt-9 bg-gray-50">
      <div className="w-1/4 p-6 bg-white shadow-lg h-screen rounded-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Booking Details</h3>
        <p className="text-gray-500 mb-6">{bookingData?.tripType}</p>

        {bookingData && (
          <div className="space-y-4">
            <p><strong className="text-gray-700">Pick-up Location:</strong> {bookingData.pickupLocation}</p>
            <p><strong className="text-gray-700">Destination Location:</strong> {bookingData.destinationLocation}</p>
            <p><strong className="text-gray-700">Pick-up Date:</strong> {bookingData.pickupDate}</p>
            <p><strong className="text-gray-700">Pick-up Time:</strong> {bookingData.pickupTime}</p>
            {bookingData.tripType === 'RoundTrip' && (
              <>
                <p><strong className="text-gray-700">Return Pick-up Location:</strong> {bookingData.returnPickupLocation}</p>
                <p><strong className="text-gray-700">Return Destination Location:</strong> {bookingData.returnDestinationLocation}</p>
                <p><strong className="text-gray-700">Return Date:</strong> {bookingData.returnDate}</p>
                <p><strong className="text-gray-700">Return Time:</strong> {bookingData.returnTime}</p>
              </>
            )}
            <p className="text-gray-700"><strong>Passenger Count:</strong> {bookingData?.passengerCount}</p>

            <div className="mt-4">
              <label htmlFor="passengerCount" className="block text-gray-600 mb-2">
                Enter Passenger Count:
              </label>
              <input
                id="passengerCount"
                type="number"
                value={passengerCount}
                onChange={(e) => setPassengerCount(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter number of passengers"
              />
            </div>

            {selectedCar && (
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800">Selected Car:</h4>
                <Image src={selectedCar.image} alt={selectedCar.make} width={100} height={100} />
                <p>{selectedCar.make} ({selectedCar.passengerCapacity} Passengers)</p>
              </div>
            )}

            {!isPersonalDetailsPage && selectedCar && (
              <CustomButton
                title="Continue"
                containerStyles="w-full py-3 rounded-full bg-[#F8B02B] mt-4 hover:bg-[#e66c00] transition-all"
                textStyles="text-black text-lg font-semibold flex items-center justify-center"
                handleClick={() => setIsPersonalDetailsPage(true)}
              >
                <ChevronRightIcon className="ml-2 w-5 h-5" />
              </CustomButton>
            )}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className={`w-3/4 p-6 ${isPersonalDetailsPage ? 'hidden' : ''}`}>
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Available Cars</h3>
        {loading && <div className="spinner text-center text-lg text-gray-600">Loading...</div>}
        {noCarsMessage && <p className="text-center text-red-600">{noCarsMessage}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paginatedCars.map((car) => (
            <CarCard key={car._id} car={car} onSelect={() => selectCar(car)} />
          ))}
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-6 py-3 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-all"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage * carsPerPage >= filteredCars.length}
            className="px-6 py-3 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-all"
          >
            Next
          </button>
        </div>
      </div>

      {/* Personal Details Form */}
      {isPersonalDetailsPage && (
        <div className="w-3/4 p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Personal Details</h3>
          <div className="space-y-4">
            <Listbox
              value={userDetails.title}
              onChange={(value) => setUserDetails((prev) => ({ ...prev, title: value }))}
            >
              <Listbox.Button className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#F8B02B]">
                {userDetails.title || 'Select Title'}
              </Listbox.Button>
              <Listbox.Options className="bg-white border border-gray-300 rounded-md mt-2">
                {titles.map((title, index) => (
                  <Listbox.Option key={index} value={title}>
                    {title}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>

            <div>
              <label htmlFor="firstName" className="text-gray-600">First Name:</label>
              <input
                id="firstName"
                type="text"
                value={userDetails.firstName}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, firstName: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-[#F8B02B]"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="text-gray-600">Last Name:</label>
              <input
                id="lastName"
                type="text"
                value={userDetails.lastName}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, lastName: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-[#F8B02B]"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-gray-600">Email:</label>
              <input
                id="email"
                type="email"
                value={userDetails.email}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-[#F8B02B]"
              />
            </div>

            <div>
              <label htmlFor="phone" className="text-gray-600">Phone:</label>
              <input
                id="phone"
                type="tel"
                value={userDetails.phone}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, phone: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-[#F8B02B]"
              />
            </div>

            <div className="mt-8">
              <CustomButton
                title={submitting ? 'Submitting...' : 'Confirm Booking'}
                containerStyles="w-full py-3 bg-[#F8B02B] rounded-full text-lg text-black font-semibold"
                handleClick={handleSubmit}
                disabled={submitting}
              />
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-75 z-10">
          <div className="flex justify-center items-center h-full">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
              <h2 className="text-2xl font-semibold">Booking Confirmed!</h2>
              <p className="mt-4">Your booking has been confirmed successfully!</p>
              <button
                onClick={() => setIsSuccessModalOpen(false)}
                className="mt-4 px-6 py-3 bg-[#F8B02B] text-white rounded-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooking;
