import React, { useState } from 'react';

const Search = () => {
  const [face, setFace] = useState('');

  const handleChange = (e) => {
    setFace(e.target.value);
  };

  const handleSearch = () => {
    // Implement the search functionality here
  };

  return (
    <div className='flex lg:justify-around flex-col lg:flex-row lg:mt-20'>
      <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#003300_100%)]"></div>
      <div className='flex items-center gap-6 justify-center mt-10 relative animate-fadeInUp'>
        <div className='w-full max-w-xs'>
          <label
            className="block mb-2 text-lg font-bold text-green-600"
            htmlFor="file_input">
            Search face
          </label>
          <input
            className="block p-3 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent h-12"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            name='face'
            value={face}
            onChange={handleChange}
          />
          <p
            className="mt-1 text-sm text-gray-500"
            id="file_input_help">
            SVG, PNG, JPG, or GIF (MAX. 800x400px).
          </p>
        </div>
        <button
          onClick={handleSearch}
          className='p-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:bg-green-700 hover:shadow-xl hover:scale-105'>
          Search
        </button>
      </div>

      <div className='flex justify-center ml-10 mr-10 p-10 animate-fadeInUp'>
        <div className='bg-gradient-to-r from-green-400 to-green-300 w-full h-[360px] rounded-lg flex justify-between gap-10 shadow-lg overflow-hidden'>
          {/* Showcase the data here */}
          <div className='flex flex-col mt-5 ml-10 h-full'>
            <h1 className='font-bold text-2xl text-white mb-10'>Details Of the Criminal</h1>
            <div className='overflow-y-auto h-[250px] bg-gray-800 rounded-lg p-4'>
              <p className='text-sm text-gray-200'>Name: John Doe</p>
              <p className='text-sm text-gray-200'>Age: 25</p>
              <p className='text-sm text-gray-200'>Gender: Male</p>
              <p className='text-sm text-gray-200'>Location: New York</p>
              <p className='text-sm text-gray-200'>Profession: Student</p>
              <p className='text-sm text-gray-200'>Name: John Doe</p>
              <p className='text-sm text-gray-200'>Age: 25</p>
              <p className='text-sm text-gray-200'>Gender: Male</p>
              <p className='text-sm text-gray-200'>Location: New York</p>
              <p className='text-sm text-gray-200'>Profession: Student</p>
            </div>
          </div>

          {/* Image */}
          <div className='mt-10 mr-10 flex-shrink-0'>
            <img src='https://via.placeholder.com/150' alt='Criminal' className='rounded-full h-40 w-40 border-4 border-white shadow-md' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
