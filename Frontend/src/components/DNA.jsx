import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [search, setSearch] = useState('');
  const [criminalList, setCriminalList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCriminal, setSelectedCriminal] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/criminals`);
      console.log(response.data);
      setCriminalList(response.data);
    } catch (error) {
      console.error('Error fetching criminals:', error);
    }
  };

  const handleView = (criminal) => {
    setShowModal(true);
    setSelectedCriminal(criminal);
  };

  const handleSearch = () => {
    try {
      const searchValue = search.toLowerCase();
      if (searchValue) {
        const filtered = criminalList.filter((criminal) =>
          criminal.dna.toLowerCase().includes(searchValue) // Assuming DNA is what you're searching for
        );
        if (filtered.length === 0) {
          alert('No results found!');
        }
        setSearchList(filtered);
      }
    } catch (error) {
      console.error('Error filtering criminals:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('overlay')) {
      setShowModal(false);
    }
  };

  return (
    <>
      <div className='flex flex-col items-center justify-center mt-10 animate-fadeInUp'>
        <div className='relative w-full max-w-lg'>
          <i className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black fa-solid fa-magnifying-glass"></i>
          <input
            type='text'
            className='w-full rounded-lg p-3 pl-10 outline-none border border-gray-300 focus:ring-2 focus:ring-green-500 shadow-md'
            placeholder='Search for a criminal by DNA'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          className='p-3 mt-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-all duration-300 shadow-lg'
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className='flex justify-center p-10 mt-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {searchList.map((criminal) => (
            <div key={criminal.id} className='bg-gray-800 text-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105'>
              <img
                src={criminal.photo}
                alt='Criminal'
                className='rounded-full h-32 w-32 object-cover mx-auto mb-6'
              />
              <h3 className='text-center text-xl font-semibold mb-4'>{criminal.name}</h3>
              <button
                className='block w-full bg-blue-500 p-3 rounded-md text-white font-bold hover:bg-blue-600 transition-all duration-300'
                onClick={() => handleView(criminal)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div
          className='fixed top-0 left-0 w-full h-full overlay bg-black bg-opacity-60 flex justify-center items-center p-4'
          onClick={handleOverlayClick}
        >
          <div className='bg-gray-900 text-white p-10 rounded-2xl relative max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl'>
            <button
              className='absolute top-4 right-4 text-white bg-red-500 rounded-full p-2 hover:bg-red-600 transition-all duration-300'
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <h1 className='text-2xl font-bold mb-8'>Details of the Criminal</h1>
            <div className='flex flex-col lg:flex-row items-start gap-6'>
              <div className='flex-1'>
                <p><strong>Name:</strong> {selectedCriminal.name}</p>
                <p className='mt-4'><strong>Age:</strong> {selectedCriminal.age || 'N/A'}</p>
                <p className='mt-4'><strong>Gender:</strong> {selectedCriminal.gender}</p>
                <p className='mt-4'><strong>Address:</strong> {selectedCriminal.address}</p>
                <p className='mt-4'><strong>Date Of Birth:</strong> {selectedCriminal.dob || 'N/A'}</p>
                <p className='mt-4'><strong>Contact:</strong> {selectedCriminal.contact}</p>
                <p className='mt-4'><strong>Arrested On:</strong> {selectedCriminal.arrestedOn || 'N/A'}</p>
                <p className='mt-4'><strong>Crime:</strong> {selectedCriminal.crime}</p>
                <p className='mt-4'><strong>Height:</strong> {selectedCriminal.height || 'N/A'}</p>
                <p className='mt-4'><strong>Weight:</strong> {selectedCriminal.weight || 'N/A'}</p>
                <p className='mt-4'><strong>Blood Group:</strong> {selectedCriminal.bloodGroup || 'N/A'}</p>
                <p className='mt-4'><strong>Prison Name:</strong> {selectedCriminal.prisonName || 'N/A'}</p>
                <p className='mt-4'><strong>DNA Sequence:</strong> {selectedCriminal.dna}</p>
                <p className='mt-4'><strong>Station Name:</strong> {selectedCriminal.stationName || 'N/A'}</p>
                <div className='mt-4'>
                  <strong>Fingerprint:</strong>
                  <img
                    src={selectedCriminal.fingerprint}
                    alt='Fingerprint'
                    className='rounded-full h-20 w-20 mt-2'
                  />
                </div>
              </div>
              <div className='flex-none lg:w-1/4 flex flex-col items-center'>
                <img
                  src={selectedCriminal.photo}
                  alt='Criminal Photo'
                  className='rounded-full h-40 w-40 mb-4'
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
