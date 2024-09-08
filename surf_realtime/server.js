import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors()); // Enable CORS for all routes

const port = 5000; // Port for your proxy server

app.get('/proxy', async (req, res) => {
  try {
    const response = await axios.get('https://www.ndbc.noaa.gov/data/realtime2/41053.spec');
    res.send(response.data); // Send the response data back to the client
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
