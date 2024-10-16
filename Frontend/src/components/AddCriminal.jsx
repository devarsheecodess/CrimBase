import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import axios from 'axios';

const AddCriminal = () => {
  const [photo, setPhoto] = useState(null);
  const [fingerprint, setFingerprint] = useState(null);
  const [base64PhotoURL, setBase64PhotoURL] = useState('');
  const [base64FingerprintURL, setBase64FingerprintURL] = useState('');
  const [form, setForm] = useState({
    id: '',
    photo: '',
    name: '',
    gender: '',
    age: '',
    address: '',
    dob: '',
    contact: '',
    arrestedOn: '',
    arrestedBy: '',
    crime: '',
    state: '',
    location: '',
    height: '',
    weight: '',
    complexion: '',
    prisonName: '',
    bloodGroup: '',
    dna: '',
    stationName: '',
    fingerprint: '',
    comments: ''
  });

  // Convert file to base64
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64PhotoURL(reader.result);
      };
      reader.readAsDataURL(file); // Converts the file to base64 URL
    }
  };

  const handleFingerprintChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64FingerprintURL(reader.result);
      };
      reader.readAsDataURL(file); // Converts the file to base64 URL
    }
  };

  const addCriminal = async (e) => {
    e.preventDefault();
    try {
      setForm({
        ...form,
        id: uuidv4(),
        photo: base64PhotoURL,
        fingerprint: base64FingerprintURL
      });

      const response1 = await axios.post('http://localhost:3000/criminals', { data: form });
      const response2 = await axios.post('http://localhost:3000/faces', { data: { id: form.id, photo: form.photo } });
      const response3 = await axios.post('http://localhost:3000/fingerprints', { data: { id: form.id, fingerprint: form.fingerprint } });
      const response4 = await axios.post('http://localhost:3000/dna', { data: form });
      console.log(form);
      alert('Criminal added successfully');
    } catch (error) {
      console.error("Error encoding file:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form className="max-w-3xl mx-auto bg-gradient-to-r from-green-900 to-green-950 mt-10 mb-10 p-8 rounded-xl shadow-lg animate-fadeInUp flex flex-col" onSubmit={addCriminal}>
        <h1 className="text-[#58C858] font-bold text-3xl text-center mb-8 text-shadow-glow">Enter Criminal Details</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Photo Input */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-400" htmlFor="photo_input">Photo</label>
            <input
              name="photo"
              onChange={handlePhotoChange}
              className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="photo_input"
              type="file"
              accept="image/*"
              required
            />
          </div>

          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-400">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="block w-full p-2.5 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              placeholder="Enter Name"
              required
            />
          </div>

          {/* Age Input */}
          <div>
            <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-400">Age</label>
            <input
              type="number"
              name="age"
              onChange={handleChange}
              className="block w-full p-2.5 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              placeholder="Enter Age"
              required
            />
          </div>

          {/* Gender Input */}
          <div>
            <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-400">Gender</label>
            <select
              name="gender"
              onChange={handleChange}
              className="block w-full p-2.5 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              required
            >
              <option value="" disabled selected>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Address Input */}
          <div>
            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-400">Address</label>
            <input
              type="text"
              name="address"
              onChange={handleChange}
              className="block w-full p-2.5 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              placeholder="Enter Address"
              required
            />
          </div>

          {/* Date of Birth Input */}
          <div>
            <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-400">Date of Birth</label>
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              className="block w-full p-2.5 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
            />
          </div>

          {/* Contact Number Input */}
          <div>
            <label htmlFor="contact" className="block mb-2 text-sm font-medium text-gray-400">Contact Number</label>
            <input
              type="text"
              name="contact"
              onChange={handleChange}
              className="block w-full p-2.5 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              placeholder="Enter Contact Number"
              required
            />
          </div>

          {/* Arrested On Input */}
          <div>
            <label htmlFor="arrestedOn" className="block mb-2 text-sm font-medium text-gray-400">Arrested On</label>
            <input
              type="date"
              name="arrestedOn"
              onChange={handleChange}
              className="block w-full p-2.5 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
            />
          </div>

          {/* Arrested By Input */}
          <div>
            <label htmlFor="arrestedBy" className="block mb-2 text-sm font-medium text-gray-400">Arrested By</label>
            <input
              type="text"
              name="arrestedBy"
              onChange={handleChange}
              className="block w-full p-2.5 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              placeholder="Enter Officer's Name"
              required
            />
          </div>

          {/* Crime Input */}
          <div>
            <label htmlFor="crime" className="block mb-2 text-sm font-medium text-gray-400">Crime</label>
            <input
              type="text"
              name="crime"
              onChange={handleChange}
              className="block w-full p-2.5 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              placeholder="Enter Crime Committed"
              required
            />
          </div>

          {/* State Input */}
          <div>
            <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-400">State</label>
            <input
              type="text"
              name="state"
              onChange={handleChange}
              className="block w-full p-2.5 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              placeholder="Enter State"
              required
            />
          </div>

          {/* Location Input */}
          <div>
            <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-400">Location</label>
            <input
              type="text"
              name="location"
              onChange={handleChange}
              className="block w-full p-2.5 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              placeholder="Enter Location of Arrest"
              required
            />
          </div>

          {/* Height Input */}
          <div>
            <label htmlFor="height" className="block mb-2 text-sm font-medium text-gray-400">Height (cm)</label>
            <input
              type="number"
              name="height"
              onChange={handleChange}
              className="block w-full p-2.5 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              placeholder="Enter Height"
            />
          </div>

          {/* Weight Input */}
          <div>
            <label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-400">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              onChange={handleChange}
              className="block w-full p-2.5 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              placeholder="Enter Weight"
            />
          </div>

          {/* Complexion Input */}
          <div>
            <label htmlFor="complexion" className="block mb-2 text-sm font-medium text-gray-400">Complexion</label>
            <input
              type="text"
              name="complexion"
              onChange={handleChange}
              className="block w-full p-2.5 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              placeholder="Enter Complexion"
            />
          </div>

          {/* Prison Name Input */}
          <div>
            <label htmlFor="prisonName" className="block mb-2 text-sm font-medium text-gray-400">Prison Name</label>
            <input
              type="text"
              name="prisonName"
              onChange={handleChange}
              className="block w-full p-2.5 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              placeholder="Enter Prison Name"
            />
          </div>

          {/* Blood Group Input */}
          <div>
            <label htmlFor="bloodGroup" className="block mb-2 text-sm font-medium text-gray-400">Blood Group</label>
            <input
              type="text"
              name="bloodGroup"
              onChange={handleChange}
              className="block w-full p-2.5 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              placeholder="Enter Blood Group"
            />
          </div>

          {/* DNA Input */}
          <div>
            <label htmlFor="dna" className="block mb-2 text-sm font-medium text-gray-400">DNA</label>
            <input
              type="text"
              name="dna"
              onChange={handleChange}
              className="block w-full p-2.5 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              placeholder="Enter DNA Information"
            />
          </div>

          {/* Police Station Name Input */}
          <div>
            <label htmlFor="stationName" className="block mb-2 text-sm font-medium text-gray-400">Police Station Name</label>
            <input
              type="text"
              name="stationName"
              onChange={handleChange}
              className="block w-full p-2.5 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              placeholder="Enter Police Station Name"
            />
          </div>


          {/* Fingerprint Input */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-400" htmlFor="photo_input">Fingerprint</label>
            <input
              name="fingerprint"
              onChange={handleFingerprintChange}
              className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="photo_input"
              type="file"
              accept="image/*"
              required
            />
          </div>

          {/* Comments Input */}
          <div className="col-span-2">
            <label htmlFor="comments" className="block mb-2 text-sm font-medium text-gray-400">Comments</label>
            <textarea
              name="comments"
              onChange={handleChange}
              className="block w-full p-2.5 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              placeholder="Enter Comments"
              rows="3"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full p-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
        >
          Add Criminal
        </button>
      </form>
    </>
  );
};

export default AddCriminal;
