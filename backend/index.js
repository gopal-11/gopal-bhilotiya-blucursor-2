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

app.get('/items', async (req, res) => {
  const { index, limit } = req.query;
  const ind = Number(index);
  const lim = Number(limit);
  const data = await fetchData(lim + (lim - ind));
  const updatedData = data.slice(ind, lim + ind);

  res.json(updatedData);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
