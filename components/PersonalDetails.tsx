'use client'
import React, { useState } from 'react';

const PersonalDetails = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const handleSubmit = () => {
    // Handle personal details submission
    alert('Details submitted');
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold">Personal Details</h2>
      
      <div className="mt-4">
        <label htmlFor="name" className="block">Name</label>
        <input
          type="text"
          id="name"
          className="w-full border rounded-md px-4 py-2 mt-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="mt-4">
        <label htmlFor="email" className="block">Email</label>
        <input
          type="email"
          id="email"
          className="w-full border rounded-md px-4 py-2 mt-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="mt-4">
        <label htmlFor="phone" className="block">Phone</label>
        <input
          type="tel"
          id="phone"
          className="w-full border rounded-md px-4 py-2 mt-2"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      
      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-500 text-white py-2 rounded-md"
        >
          Submit Details
        </button>
      </div>
    </div>
  );
};

export default PersonalDetails;
