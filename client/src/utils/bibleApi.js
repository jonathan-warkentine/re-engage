import axios from 'axios';

const searchAllBooks = async () => {
  const booksResponse = await axios.get('/allBooks');
  return booksResponse.data.allBooks;
};

const searchAllChapters = async (book) => {
  const response = await axios.get(`/chapters?book=${book}`);
  return response.data.chapters;
};

const searchChapter = async (book, chapter, version) => {
  const response = await axios.get(`/singleChapter?book=${book}&chapter=${chapter}&version=${version}`);
  return response.data.chapter;
};

const searchVerse = async (book, chapter, verse, version) => {
  const response = await axios.get(`/singleVerse?book=${book}&chapter=${chapter}&verse=${verse}&version=${version}`);
  return response.data.verse;
};


export {
  searchAllBooks,
  searchAllChapters,
  searchChapter,
  searchVerse
};
