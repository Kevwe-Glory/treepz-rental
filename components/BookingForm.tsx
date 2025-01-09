'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const BookingForm = () => {
  const router = useRouter();

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Centralized form state management
  const [formState, setFormState] = useState({
    tripType: 'One Way',
    pickupLocation: '',
    destinationLocation: '',
    pickupDate: '',
    pickupTime: '',
    returnPickupLocation: '',
    returnDestinationLocation: '',
    returnDate: '',
    returnTime: '',
    passengerCount: 1,
  });

  const handleInputChange = (field, value) => {
    setFormState((prevState) => ({ ...prevState, [field]: value }));
  };

  const validateForm = () => {
    const { tripType, pickupLocation, destinationLocation, pickupDate, pickupTime } = formState;

    // Basic validation
    if (!pickupLocation || !destinationLocation || !pickupDate || !pickupTime) {
      alert('Please fill in all required fields.');
      return false;
    }

    if (
      tripType === 'RoundTrip' &&
      (!formState.returnPickupLocation ||
        !formState.returnDestinationLocation ||
        !formState.returnDate ||
        !formState.returnTime)
    ) {
      alert('Please fill in all return trip fields.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const bookingData = { ...formState };

    // Wrap the data as a single JSON object in a query parameter
    const queryParams = new URLSearchParams();
    queryParams.set('bookingData', JSON.stringify(bookingData));

    try {
      console.log('booking data submitted:', bookingData);
      router.push(`/my-booking?${queryParams.toString()}`);
    } catch (error) {
      console.error('Error submitting the booking:', error);
      alert('There was an error processing this form');
    }
  };

  const timeOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(
        <option key={i} value={i < 10 ? '0' + i : i}>
          {i < 10 ? '0' + i : i}
        </option>
      );
    }
    return options;
  };

  return (
    <section className="flex items-center justify-center bg-gray-100 rounded-2xl">
      <div className="p-8 shadow-md rounded-md w-full max-w-4xl">
        {/* Trip Type */}
        <div className="mb-4 text-center">
          <h3 className="text-2xl font-semibold">Book Your Trip</h3>
        </div>
        <div className="mb-4">
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="tripType"
                value="One Way"
                checked={formState.tripType === 'One Way'}
                onChange={(e) => handleInputChange('tripType', e.target.value)}
                className="mr-2 appearance-none border-2 border-black rounded-full w-4 h-4 checked:bg-black checked:border-black focus:ring-0"
              />
              One-Way
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="tripType"
                value="RoundTrip"
                checked={formState.tripType === 'RoundTrip'}
                onChange={(e) => handleInputChange('tripType', e.target.value)}
                className="mr-2 appearance-none border-2 border-black rounded-full w-4 h-4 checked:bg-black checked:border-black focus:ring-0"
              />
              Round Trip
            </label>
          </div>
        </div>

        {/* One-Way Fields */}
        <div className="mb-4">
          <div className="flex space-x-4">
            <div className="w-1/3">
              <label htmlFor="pickupLocation" className="block text-gray-700 mb-2">
                Pick-up Location
              </label>
              <input
                type="text"
                id="pickupLocation"
                className="w-full border border-gray-300 rounded-md px-4 py-3"
                placeholder="Enter pick-up location"
                value={formState.pickupLocation}
                onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
              />
            </div>

            <div className="w-1/3">
              <label htmlFor="destinationLocation" className="block text-gray-700 mb-2">
                Destination Location
              </label>
              <input
                type="text"
                id="destinationLocation"
                className="w-full border border-gray-300 rounded-md px-4 py-3"
                placeholder="Enter destination location"
                value={formState.destinationLocation}
                onChange={(e) => handleInputChange('destinationLocation', e.target.value)}
              />
            </div>

            <div className="w-1/3">
              <label htmlFor="pickupDate" className="block text-gray-700 mb-2">
                Pick-up Date
              </label>
              <input
                type="date"
                id="pickupDate"
                className="w-full border border-gray-300 rounded-md px-4 py-3"
                value={formState.pickupDate}
                onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                min={today} Disable past dates
              />
            </div>
            <div className="w-1/3">
              <label htmlFor="pickupTime" className="block text-gray-700 mb-2">
                Pick-up Time
              </label>
              <input
                type="time"
                id="pickupTime"
                className="w-full border border-gray-300 rounded-md px-4 py-3"
                value={formState.pickupTime}
                onChange={(e) => handleInputChange('pickupTime', e.target.value)}
                onClick={() => document.getElementById('time-dropdown').classList.toggle('hidden')}
              />
            </div>
          </div>
        </div>

        {/* Round Trip Fields */}
        {formState.tripType === 'RoundTrip' && (
          <div className="mb-4">
            <div className="flex space-x-4">
              <div className="w-1/3">
                <label htmlFor="returnPickupLocation" className="block text-gray-700 mb-2">
                  Return Pick-up
                </label>
                <input
                  type="text"
                  id="returnPickupLocation"
                  className="w-full border border-gray-300 rounded-md px-4 py-3"
                  placeholder="Enter return pick-up location"
                  value={formState.returnPickupLocation}
                  onChange={(e) => handleInputChange('returnPickupLocation', e.target.value)}
                />
              </div>

              <div className="w-1/3">
                <label htmlFor="returnDestinationLocation" className="block text-gray-700 mb-2">
                  Return Destination
                </label>
                <input
                  type="text"
                  id="returnDestinationLocation"
                  className="w-full border border-gray-300 rounded-md px-4 py-3"
                  placeholder="Enter return destination location"
                  value={formState.returnDestinationLocation}
                  onChange={(e) => handleInputChange('returnDestinationLocation', e.target.value)}
                />
              </div>

              <div className="w-1/3">
                <label htmlFor="returnDate" className="block text-gray-700 mb-2">
                  Return Date
                </label>
                <input
                  type="date"
                  id="returnDate"
                  className="w-full border border-gray-300 rounded-md px-4 py-3"
                  value={formState.returnDate}
                  onChange={(e) => handleInputChange('returnDate', e.target.value)}
                  min={today} Disable past dates
                />
              </div>

              <div className="w-1/3">
                <label htmlFor="returnTime" className="block text-gray-700 mb-2">
                  Return Time
                </label>
                <input
                  type="time"
                  id="returnTime"
                  className="w-full border border-gray-300 rounded-md px-4 py-3"
                  value={formState.returnTime}
                  onChange={(e) => handleInputChange('returnTime', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#F8B02B] text-white py-2 rounded-lg font-bold hover:bg-[#e66c00] transition-colors"
        >
          Submit Booking
        </button>
      </div>
    </section>
  );
};

export default BookingForm;