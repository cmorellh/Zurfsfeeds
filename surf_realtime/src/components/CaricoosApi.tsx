import { useState, useEffect } from 'react';
import axios from 'axios';

import './RestAxios.css'; // Importing the custom CSS

export const CaricoolsPollingWaves = () => {
  const [parsedData, setParsedData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.caricoos.org/api/station/san-juan/us/latest/waves');
        parseData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Fetch data immediately on mount
    const intervalId = setInterval(fetchData, 5000); // Polling every 5 seconds
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  // Function to parse the feed data
  const parseData = (data) => {
    // Extract specific values from the JSON data
    const significantWaveHeight = data.significant_wave_height?.value || 'N/A';
    const meanWaveDirection = data.mean_wave_direction?.value || 'N/A';

    // Update state with the parsed data
    setParsedData({
      FT: significantWaveHeight,
      SWD: meanWaveDirection
    });
  };

  return (
    <div className='main_container'>
      <div className="legend-container">
        <h4>Legend</h4>
        <ul>
          <li><strong>FT:</strong> Significant Wave Height (ft)</li>
          <li><strong>SWD:</strong> Mean Wave Direction (degrees)</li>
        </ul>
      </div>
      <div className="feed-container">
        <h1 className="fetmux ed-title">Caricoos API - Latest Waves</h1>
        <div className="messages-container">
          {/* <h3 className="messages-header">Parsed Data:</h3> */}
          <ul className="el_ul_styling">
            <li className="el_li_style">
              <strong>FT:</strong> {parsedData.FT} ft
            </li>
            <li className="el_li_style">
              <strong>SWD:</strong> {parsedData.SWD} degrees
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
