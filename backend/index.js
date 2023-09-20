const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.use(express.json());

const fetchData = async (limit) => {
  try {
    const response = await axios.get(
      `https://fakestoreapi.com/products?limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

app.get('/items/:startIndex/:count', async (req, res) => {
  const { startIndex, count } = req.params;
  const ind = Number(startIndex);
  const lim = Number(count);
  const data = await fetchData(lim + ind);

  // I didn/t find api which takes index and limit as dynamic in path url
  // so modified it here the response to work as expected from the backend server
  const updatedData = data.slice(ind, lim + ind);

  res.json(updatedData);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
