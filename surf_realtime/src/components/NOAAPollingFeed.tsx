// import { useState, useEffect } from 'react';
// import axios from 'axios';

// import './RestAxios.css'

// export const RestPollingFeed = () => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/proxy'); // Replace with your proxy server URL
//         setMessages(response.data.split('\n')); // Split the data by lines if necessary
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     const intervalId = setInterval(fetchData, 5000); // Polling every 5 seconds
//     return () => clearInterval(intervalId); // Cleanup on unmount
//   }, []);

//   return (
//     <div>
//       <h1>NOAA Real-Time Feed</h1>
//       <div>
//         <h3>Messages:</h3>
//         <ul className='el_ul_styling'>
//           {messages.map((msg, index) => (
//             <li className="el_li_style" key={index}>{msg}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from 'react';
// import axios from 'axios';

// import './RestAxios.css'; // Importing the custom CSS

// export const RestPollingFeed = () => {
//   const [parsedData, setParsedData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/proxy'); // Replace with your proxy server URL
//         parseData(response.data); // Call the function to parse the data
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     const intervalId = setInterval(fetchData, 5000); // Polling every 5 seconds
//     return () => clearInterval(intervalId); // Cleanup on unmount
//   }, []);

//   // Function to parse the feed data
//   const parseData = (data) => {
//     const lines = data.split('\n'); // Split data by new lines
//     const headers = lines[0].replace('#', '').split(/\s+/); // Extract headers (remove # and split by whitespace)
    
//     const parsed = lines.slice(2).map((line) => {
//       const values = line.split(/\s+/); // Split each row by whitespace
//       // Create an object mapping headers to values
//       return headers.reduce((obj, header, index) => {
//         obj[header] = values[index] || 'N/A'; // Map headers to their corresponding values
//         return obj;
//       }, {});
//     });

//     setParsedData(parsed); // Save parsed data to state
//   };

//   return (
//     <div className="feed-container"> {/* Container for the feed */}
//       <h1 className="feed-title">NOAA Real-Time Feed</h1> {/* Title */}
//       <div className="messages-container"> {/* Container for parsed messages */}
//         <h3 className="messages-header">Parsed Data:</h3>
//         <ul className="el_ul_styling">
//           {parsedData.map((row, index) => (
//             <li className="el_li_style" key={index}>
//               {Object.entries(row).map(([key, value]) => (
//                 <p key={key}><strong>{key}:</strong> {value}</p>
//               ))}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from 'react';
// import axios from 'axios';

// import './RestAxios.css'; // Importing the custom CSS

// export const RestPollingFeed = () => {
//   const [parsedData, setParsedData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/proxy'); // Replace with your proxy server URL
//         parseData(response.data); // Call the function to parse the data
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     const intervalId = setInterval(fetchData, 5000); // Polling every 5 seconds
//     return () => clearInterval(intervalId); // Cleanup on unmount
//   }, []);

//   // Function to parse the feed data
//   const parseData = (data) => {
//     const lines = data.split('\n'); // Split data by new lines
//     const headers = lines[0].replace('#', '').split(/\s+/); // Extract headers (remove # and split by whitespace)
    
//     const parsed = lines.slice(2).map((line) => {
//       const values = line.split(/\s+/); // Split each row by whitespace
//       // Create an object mapping headers to values
//       return headers.reduce((obj, header, index) => {
//         obj[header] = values[index] || 'N/A'; // Map headers to their corresponding values
//         return obj;
//       }, {});
//     });

//     setParsedData(parsed); // Save parsed data to state
//   };

//   return (
//     <div className="feed-container"> {/* Container for the feed */}
//       <h1 className="feed-title">NOAA Real-Time Feed</h1> {/* Title */}
//       <div className="messages-container"> {/* Container for parsed messages */}
//         <h3 className="messages-header">Parsed Data:</h3>
//         <ul className="el_ul_styling">
//           {parsedData.map((row, index) => (
//             <li className="el_li_style" key={index}>
//               {/* Render fields in a one-liner */}
//               {Object.entries(row).map(([key, value], idx) => (
//                 <span key={idx}>
//                   <strong>{key}:</strong> {value}{' '}
//                 </span>
//               ))}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import axios from 'axios';

import './RestAxios.css'; // Importing the custom CSS

export const NOAAPollingFeed = () => {
  const [parsedData, setParsedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/proxy'); // Replace with your proxy server URL
        parseData(response.data); // Call the function to parse the data
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
    const lines = data.split('\n'); // Split data by new lines
    const headers = lines[0].replace('#', '').split(/\s+/); // Extract headers (remove # and split by whitespace)
    
    const parsed = lines.slice(2).map((line) => {
      const values = line.split(/\s+/); // Split each row by whitespace
      return headers.reduce((obj, header, index) => {
        obj[header] = values[index] || 'N/A'; // Map headers to their corresponding values
        return obj;
      }, {});
    });

    console.log('Parsed Data:', parsed); // Debugging: Check parsed data
    setParsedData(parsed); // Reverse the parsed data to make the latest data appear first
  };

  return (
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
        <h1 className="feed-title">NOAA Real-Time Feed</h1>
        <div className="messages-container">
          {/* <h3 className="messages-header">Parsed Data:</h3> */}
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
  );
}
