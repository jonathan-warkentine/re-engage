// Axios is a popular NPM package used for preforming API requests
import axios from 'axios';
// const axios = require('axios')

// Using axios, we create a search method that is specific to our use case and export it at the bottom
const search = async () => {
  const response = await axios.get('/versions');
  return response.data.result
}

const searchAllBooks = async () => {
  const booksResponse = await axios.get('/allBooks');
  return booksResponse.data.allBooks
}

export {
  search,
  searchAllBooks
};

