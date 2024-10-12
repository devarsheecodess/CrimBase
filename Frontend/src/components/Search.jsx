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

  const handleSearch = (e) => {
    try {
      setSearch(search.toLowerCase());
      console.log(search);
      if (search) {
        const filtered = criminalList.filter((criminal) =>
          criminal.name.toLowerCase().includes(search)
        );

        if (filtered.length === 0) {
          alert("No results found!");
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
    // Check if the click was on the overlay
    if (e.target.classList.contains('overlay')) {
      setShowModal(false);
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
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        <button className='p-2 bg-[#58C858] text-[#224420] font-medium rounded-lg' onClick={(e) => handleSearch()}>
          Search
        </button>
      </div>

      <div className='flex justify-center ml-20 mr-20 p-10 animate-fadeInUp'>
        <div className='bg-gray-500 w-full h-full rounded-lg mt-3 flex flex-wrap justify-center overflow-y-scroll'>
          {/* Showcase the data here */}
          {
            searchList.map((criminal) => {
              return (
                <div key={criminal.id} className='bg-gray-700 w-1/4 h-auto rounded-lg mt-10 m-7 flex flex-col items-center p-9'>
                  <img src={criminal.photo} alt='Criminal' className='rounded-full h-30 w-30 mx-auto mb-10 object-contain' />
                  <p className='mt-5 text-white'>{criminal.name}</p>
                  <button className='pr-4 pl-4 pt-2 pb-2 bg-blue-500 rounded-md mt-5' onClick={() => handleView(criminal)}>
                    View
                  </button>
                </div>
              );
            })
          }
        </div>
      </div>

      {
        showModal && (
          <div className='fixed top-0 left-0 w-full h-full overlay backdrop-blur-sm bg-black bg-opacity-50 flex justify-center items-center' onClick={handleOverlayClick}>
      <div className='bg-gray-800 text-white w-min h-auto max-h-[90vh] rounded-2xl p-10 relative overflow-y-auto'> {/* Allow for scrolling if content is too tall */}
        <button className='absolute top-4 right-4 text-white bg-red-500 rounded-md p-2' onClick={() => setShowModal(false)}>Close</button>
              <h1 className='font-bold text-xl'>Details Of the Criminal</h1>
              <div className='flex gap-60 mt-5'>
                <p className='mt-5 mb-12'> Photo:</p>
                <img src={selectedCriminal.photo} alt='Photo' className='rounded-full h-20 w-20 mx-auto' />
              </div>
              <p className='mt-5'><strong>Name: </strong>{selectedCriminal.name}</p>
              <p className='mt-5'><strong>Age:</strong> {selectedCriminal.age}</p>
              <p className='mt-5'><strong> Gender: </strong>{selectedCriminal.gender}</p>
              <p className='mt-5'> <strong>Address:</strong> {selectedCriminal.address}</p>
              <p className='mt-5'> <strong>Date Of Birth:</strong> {selectedCriminal.dob}</p>
              <p className='mt-5'> <strong>Contact:</strong> {selectedCriminal.contact}</p>
              <p className='mt-5'> <strong>Arrested On:</strong> {selectedCriminal.arrestedOn}</p>
              <p className='mt-5'> <strong>Arrested By: </strong>{selectedCriminal.arrestedBy}</p>
              <p className='mt-5'> <strong>Crime:</strong> {selectedCriminal.crime}</p>
              <p className='mt-5'> <strong>State:</strong> {selectedCriminal.state}</p>
              <p className='mt-5'> <strong>Location:</strong> {selectedCriminal.location}</p>
              <p className='mt-5'> <strong>Height:</strong> {selectedCriminal.height}</p>
              <p className='mt-5'> <strong>Weight:</strong> {selectedCriminal.weight}</p>
              <p className='mt-5'> <strong>Prison Name:</strong> {selectedCriminal.prisonName}</p>
              <p className='mt-5'> <strong>Blood Group:</strong> {selectedCriminal.bloodGroup}</p>
              <p className='mt-5'> <strong>DNA Sequence:</strong> {selectedCriminal.dna}</p>
              <p className='mt-5'> <strong>Station Name: </strong>{selectedCriminal.stationName}</p>
              <p className='mt-5'> <strong>Comments:</strong> {selectedCriminal.comments}</p>
              <div className='flex'>
                <p className='mt-5 mb-12'> <strong>Fingerprint:</strong></p>
                <img src={selectedCriminal.fingerprint} alt='Fingerprint' className='rounded-full h-20 w-20 mx-auto' />
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}

export default Search;
