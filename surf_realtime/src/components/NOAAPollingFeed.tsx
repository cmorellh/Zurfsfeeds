import { useState, useEffect } from 'react';
import axios from 'axios';

import './NOAAPollingFeed.css';

export const NOAAPollingFeed = () => {
  const [parsedData, setParsedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/proxy');
        parseData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const parseData = (data) => {
    const lines = data.split('\n');
    const headers = lines[0].replace('#', '').split(/\s+/);
    
    const parsed = lines.slice(2).map((line) => {
      const values = line.split(/\s+/);
      return headers.reduce((obj, header, index) => {
        obj[header] = values[index] || 'N/A';
        return obj;
      }, {});
    });

    console.log('Parsed Data:', parsed);
    setParsedData(parsed);
  };

  return (
    <div>
      <h1 className="feed-title">NOAA Real-Time Feed</h1>
      <div className='main_container'>
        <div className="legend-container">
          <h4>Legend</h4>
          <ul>
            <li><strong>SwH:</strong> Swell Height</li>
            <li><strong>WWD:</strong> Wind-Wave Direction</li>
            <li><strong>SwP:</strong> Swell Period</li>
            <li><strong>WWH:</strong> Wind-Wave Height</li>
            <li><strong>STP:</strong> Steepness (VERY STEEP, STEEP, AVERAGE, or SWELL)</li>
          </ul>
        </div>
        <div className="feed-container">
          <div className="messages-container">
            <ul className="el_ul_styling">
              {parsedData.slice(0, 10).map((row, index) => (
                <li className="el_li_style" key={index}>
                  {Object.entries(row).map(([key, value], idx) => (
                    <span key={idx}>
                      <strong>{key}:</strong> {value}{' '}
                    </span>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>

  );
}
