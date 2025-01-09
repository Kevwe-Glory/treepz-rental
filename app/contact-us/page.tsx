'use client'

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Dialog, Transition } from '@headlessui/react';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';

const ContactUsForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      question: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      phone: Yup.string().required('Phone number is required'),
      question: Yup.string().required('Please ask a question'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await fetch('/api/contact-us', {
          method: 'POST',
          headers: {
            'Panel -Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          setModalMessage('Your message has been sent successfully!');
          setModalType('success');
        } else {
          throw new Error('Failed to send message');
        }
      } catch (error) {
        setModalMessage('Error sending message. Please try again later.');
        setModalType('error');
      } finally {
        setSubmitting(false);
        setIsOpen(true);
      }
    },
  });

  const closeModal = () => {
    setIsOpen(false);
    setModalMessage('');
    setModalType('');
  };

  const iconStyle = {
    filter: 'invert(32%) sepia(100%) saturate(315%) hue-rotate(16deg) brightness(95%) contrast(92%)',
  };

  return (
    <div className="container mx-auto p-6 lg:flex-row space-y-8 lg:space-y-0 max-w-7xl">
      {/* Image Section */}
      <div className="w-full">
        <Image
          src="/mission.png"
          alt="Company Header"
          width={500}
          height={300}
          className="w-full h-auto rounded-lg object-cover mb-6"
        />
      </div>

      <div className="flex p-9 space-x-5">
        {/* Contact Form Section */}
        <div className="w-full lg:w-1/2">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Name and Email Inputs on the Same Line */}
            <div className="flex space-x-6">
              {/* Name Input */}
              <div className="w-full">
                <label htmlFor="name" className="block text-lg font-medium text-gray-700">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-2 mt-2 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                  placeholder="Enter your name"
                />
                {formik.touched.name && formik.errors.name && <p className="text-red-500 text-sm">{formik.errors.name}</p>}
              </div>

              {/* Email Input */}
              <div className="w-full">
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-2 mt-2 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                  placeholder="Enter your email"
                />
                {formik.touched.email && formik.errors.email && <p className="text-red-500 text-sm">{formik.errors.email}</p>}
              </div>
            </div>

            {/* Phone Input */}
            <div>
              <label htmlFor="phone" className="block text-lg font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 mt-2 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="Enter your phone number"
              />
              {formik.touched.phone && formik.errors.phone && <p className="text-red-500 text-sm">{formik.errors.phone}</p>}
            </div>

            {/* Question Input */}
            <div>
              <label htmlFor="question" className="block text-lg font-medium text-gray-700">Your Question</label>
              <textarea
                id="question"
                name="question"
                value={formik.values.question}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 mt-2 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="Write your question here"
                rows="4"
              />
              {formik.touched.question && formik.errors.question && <p className="text-red-500 text-sm">{formik.errors.question}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className={`w-1/4 py-2 mt-4 text-lg font-semibold text-white rounded-lg ${formik.isSubmitting ? 'bg-gray-400' : 'bg-[#F8B02B] hover:bg-[#e69c00]'}`}
            >
              {formik.isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Company Details Section */}
        <div className="w-full lg:w-1/2">
          <div className="bg-gray-200 rounded-xl mt-4 p-2">
            <p className="font-bold">Call Us </p>
            <div className="flex items-center space-x-2 mt-2">
              <PhoneIcon className="w-5 h-5" style={iconStyle} />
              <a href="tel:+1234567890" className="text-sm text-[#F8B02B] hover:underline" aria-label="Call Treepz at +1 234 567 890">
                +1 234 567 890
              </a>
            </div>
          </div>

          <div className="bg-gray-200 rounded-xl mt-4 p-2">
            <p className="font-bold">Contact Us</p>
            <div className="flex items-center space-x-2 mt-3">
              <EnvelopeIcon className="w-5 h-5" style={iconStyle} />
              <a href="mailto:contact@treepz.com" className="text-sm text-[#F8B02B] hover:underline">
                contact@treepz.com
              </a>
            </div>
          </div>
        </div>

        {/* Success/Error Modal */}
        <Transition appear show={isOpen} as={React.Fragment}>
          <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
            <div className="min-h-screen px-4 text-center">
              <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
              <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
              <Dialog.Panel  className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
                <Dialog.Title className={`text-2xl font-semibold ${modalType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                  {modalType === 'success' ? 'Success!' : 'Error'}
                </Dialog.Title>
                <p className="mt-4 text-lg text-gray-700">{modalMessage}</p>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="px-6 py-2 bg-[#F8B02B] text-white rounded-lg hover:bg-[#e69c00]"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel >
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
};

export default ContactUsForm;
