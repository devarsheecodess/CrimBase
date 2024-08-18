import React, { useState } from 'react';

const Search = () => {
  const [face, setFace] = useState('');

  const handleChange = (e) => {
    setFace(e.target.value);
  }

  const handleSearch = () => {
    // Implement the search functionality here
  }

  return (
    <>
      <div className='flex flex-col items-center gap-4 justify-center mt-5 relative animate-fadeInUp'>
        <div className='w-full max-w-xs'>
          <label
            className="block mb-2 text-sm font-medium text-[#58C858] text-shadow-glow"
            htmlFor="file_input">
            Search Face
          </label>
          <input
            className="block p-3 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            name='face'
            value={face}
            onChange={(e) => handleChange(e)}
          />
          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help">
            SVG, PNG, JPG, or GIF (MAX. 800x400px).
          </p>
        </div>
        <button className='p-3 bg-[#58C858] text-[#224420] font-medium rounded-lg hover:bg-[#4CAF50]'>
          Search
        </button>
      </div>


      <div className='flex justify-center ml-20 mr-20 p-10 animate-fadeInUp'>
        <div className='bg-gray-500 w-full h-[360px] rounded-lg flex justify-between' >
          {/* Showcase the data here */}
          <div className='mt-10 ml-24'>
            <h1 className='font-bold text-xl'>Details Of the Criminal</h1>
            <div className='overflow-y-scroll w-[400px] mt-5'>
              <p className='text-sm'>Name: John Doe</p>
              <p className='text-sm'>Age: 25</p>
              <p className='text-sm'>Gender: Male</p>
              <p className='text-sm'>Location: New York</p>
              <p className='text-sm'>Profession: Student</p>
              <p className='text-sm'>Name: John Doe</p>
              <p className='text-sm'>Age: 25</p>
              <p className='text-sm'>Gender: Male</p>
              <p className='text-sm'>Location: New York</p>
              <p className='text-sm'>Profession: Student</p>
            </div>
          </div>

          {/* Image */}
          <div className='mt-10 mr-24'>
            <img src='https://via.placeholder.com/150' alt='Criminal' className='rounded-full h-40 w-40 mx-auto' />
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
