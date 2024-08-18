import React, {useState} from 'react';

const Search = () => {
  const [DNA, setDNA] = useState('');

  const handleChange = (e) => {
    setDNA(e.target.value);
  }

   const handleSearch = () => {
    // Implement the search functionality here
  }

  return (
    <>
      <div className='flex gap-4 justify-center mt-10 relative animate-fadeInUp'>
        <div className='relative'>
          <i className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black fa-solid fa-magnifying-glass"></i>
          <input
            type='text'
            className='rounded-lg p-2 pl-10 outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500'
            placeholder='Search for the DNA'
            value={DNA}
            onChange={(e)=>handleChange(e)}
          />
        </div>
        <button className='p-2 bg-[#58C858] text-[#224420] font-medium rounded-lg'>
          Search
        </button>
      </div>

      <div className='flex justify-center ml-20 mr-20 p-10 animate-fadeInUp'>
        <div className='bg-gray-500 w-full h-[450px] rounded-lg mt-3 flex justify-between' >
          {/* Showcase the data here */}
          <div className='mt-10 ml-24'>
            <h1 className='font-bold text-xl'>Details Of the Criminal</h1>
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
