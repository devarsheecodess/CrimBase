import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const Face = () => {
  const [face, setFace] = useState(null);
  const [matchedId, setMatchedId] = useState(null);
  const [error, setError] = useState('');
  const [uploadedImage, setUploadedImage] = useState('');
  const [criminal, setCriminal] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif')) {
      setFace(file);
      setUploadedImage(URL.createObjectURL(file));
      setError('');
    } else {
      setError('Please upload a valid image (JPG, PNG, or GIF)');
    }
  };

  const handleSearch = async () => {
    if (!face) {
      setError('Please upload an image');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result.split(',')[1];
      try {
        const response = await axios.post('http://localhost:5000/match-face', { image: base64Image });
        setMatchedId(response.data.id);
        setError('');

        const response2 = await axios.get(`http://localhost:3000/criminal/`, { params: { id: response.data.id } });
        setCriminal(response2.data);
      } catch (err) {
        setError(err.response?.data.error || 'Error matching face');
        setMatchedId(null);
      }
    };

    reader.readAsDataURL(face);
  };

  return (
    <div className='flex lg:justify-center flex-col lg:flex-row mt-20'>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#003300_100%)]"></div>
      <div className='flex items-center gap-6 justify-center relative animate-fadeInUp'>
        <div className='w-full max-w-xs'>
          <label className="block mb-2 text-lg font-bold text-green-600" htmlFor="file_input">
            Search Face
          </label>
          <input
            className="block p-3 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent h-12"
            id="file_input"
            type="file"
            accept="image/jpeg,image/png,image/gif"
            onChange={handleChange}
          />
          <p className="mt-1 text-sm text-gray-400" id="file_input_help">
            Note: Face should be clear and visible!
          </p>
        </div>
        <button
          onClick={handleSearch}
          className='p-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:bg-green-700 hover:shadow-xl hover:scale-105'>
          Search
        </button>
      </div>

      <div className='flex justify-center ml-10 mr-10 p-10 animate-fadeInUp'>
        <div className='bg-gradient-to-r from-green-900 to-green-950  w-full h-[360px] rounded-lg flex justify-between gap-10 overflow-hidden glow-effect'>
          <div className='flex flex-col mt-5 ml-10 h-full overflow-auto'>

            <h1 className='text-2xl mb-10 text-[#58C858] font-bold text-shadow-glow"'>Details Of the Criminal</h1>
            <div className='overflow-y-auto h-[250px] bg-gray-800 rounded-lg p-4'>
              {criminal ? (
                <>
                  <h2 className='text-lg font-semibold text-green-400'>{criminal.name}</h2>
                  <p className='text-sm text-gray-200'>Age: {criminal.age}</p>
                  <p className='text-sm text-gray-200'>Gender: {criminal.gender}</p>
                  <p className='text-sm text-gray-200'>Address: {criminal.address}</p>
                  <p className='text-sm text-gray-200'>Date of Birth: {new Date(criminal.dob).toLocaleDateString()}</p>
                  <p className='text-sm text-gray-200'>Contact: {criminal.contact}</p>
                  <p className='text-sm text-gray-200'>Arrested On: {new Date(criminal.arrestedOn).toLocaleDateString()}</p>
                  <p className='text-sm text-gray-200'>Arrested By: {criminal.arrestedBy}</p>
                  <p className='text-sm text-gray-200'>Crime: {criminal.crime}</p>
                  <p className='text-sm text-gray-200'>State: {criminal.state}</p>
                  <p className='text-sm text-gray-200'>Location: {criminal.location}</p>
                  <p className='text-sm text-gray-200'>Height: {criminal.height}</p>
                  <p className='text-sm text-gray-200'>Weight: {criminal.weight}</p>
                  <p className='text-sm text-gray-200'>Complexion: {criminal.complexion}</p>
                  <p className='text-sm text-gray-200'>Prison Name: {criminal.prisonName}</p>
                  <p className='text-sm text-gray-200 truncate max-w-[250px]'>DNA: {criminal.dna}</p> {/* Updated with Tailwind ellipsis */}
                  <p className='text-sm text-gray-200'>Station Name: {criminal.stationName}</p>
                  <div className='text-sm text-gray-200'>Fingerprint: {criminal.fingerprint && (
                    <img src={criminal.fingerprint} alt='Fingerprint' className='h-10 w-10 mt-1' />
                  )}</div>
                  <p className='text-sm text-gray-200'>Comments: {criminal.comments}</p>
                </>
              ) : (
                <p className='text-sm text-gray-200'>{error || 'Enter a photo...'}</p>
              )}
            </div>
          </div>

          {/* Image */}
          <div className='mt-10 mr-10 flex-shrink-0'>
            {criminal && (
              <img src={criminal.photo || 'https://via.placeholder.com/150'} alt='Criminal' className='rounded-full h-40 w-40 border-4 border-white shadow-md' />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Face;
