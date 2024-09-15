import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [search, setSearch] = useState('');
  const [criminal, setCriminal] = useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const handleSearch = async (e) => {
    try {
      console.log(search); // Log the search term

      // Send the GET request with search term as a query parameter
      const response = await axios.get(`http://localhost:3000/criminals`, { params: { name: search } });

      // Access the data directly
      const data = response.data;

      console.log(data); // Log the response data
      setCriminal(data); // Update the state with the fetched data
    } catch (error) {
      console.error('Error fetching criminals:', error); // Handle errors
    }
  };


  return (
    <>
      <div className='flex gap-4 justify-center mt-10 relative animate-fadeInUp'>
        <div className='relative'>
          <i className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black fa-solid fa-magnifying-glass"></i>
          <input
            type='text'
            className='rounded-lg p-2 pl-10 outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500'
            placeholder='Search for a criminal'
            value={search}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button className='p-2 bg-[#58C858] text-[#224420] font-medium rounded-lg' onClick={(e) => handleSearch()}>
          Search
        </button>
      </div>

      <div className='flex justify-center ml-20 mr-20 p-10 animate-fadeInUp'>
        <div className='bg-gray-500 w-full h-[450px] rounded-lg mt-3 flex justify-between overflow-y-scroll'>
          {/* Showcase the data here */}
          {
            criminal.map((criminal) => {
              return (
                <div className='bg-gray-500 w-full h-[450px] rounded-lg mt-3 flex justify-between'>
                  <div className='mt-10 ml-24'>
                    <h1 className='font-bold text-xl'>Details Of the Criminal</h1>
                    <p className='mt-5'>Name: {criminal.name}</p>
                    <p className='mt-5'>Age: {criminal.age}</p>
                    <p className='mt-5'> Gender: {criminal.gender}</p>
                    <p className='mt-5'> Address: {criminal.address}</p>
                    <p className='mt-5'> Date Of Birth: {criminal.dob}</p>
                    <p className='mt-5'> Contact: {criminal.contact}</p>
                    <p className='mt-5'> Arrested On: {criminal.arrestedOn}</p>
                    <p className='mt-5'> Arrested By: {criminal.arrestedBy}</p>
                    <p className='mt-5'> Crime: {criminal.crime}</p>
                    <p className='mt-5'> State: {criminal.state}</p>
                    <p className='mt-5'> Location: {criminal.location}</p>
                    <p className='mt-5'> Height: {criminal.height}</p>
                    <p className='mt-5'> Weight: {criminal.weight}</p>
                    <p className='mt-5'> Prison Name: {criminal.prisonName}</p>
                    <p className='mt-5'> Blood Group: {criminal.bloodGroup}</p>
                    <p className='mt-5'> DNA Sequence {criminal.dna}</p>
                    <p className='mt-5'> Station Name: {criminal.stationName}</p>
                    <p className='mt-5'> Comments: {criminal.comments}</p>
                    <div className='flex'>
                      <p className='mt-5 mb-12'> Fingerprint:</p>
                      <img src={criminal.fingerprint} alt='Fingerprint' className='rounded-full h-20 w-20 mx-auto' />
                    </div>
                  </div>

                  {/* Image */}
                  <div className='mt-10 mr-24'>
                    <img src={criminal.photo} alt='Criminal' className='rounded-full h-40 w-40 mx-auto mb-10' />
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </>
  );
}

export default Search;
