const axios = require('axios').default;
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  app.get('/allBooks', async (req, res) => {
    const books = await axios.get(`https://bible-go-api.rkeplin.com/v1/books`)
    res.json({allBooks: books.data})
  })
  
  app.get(`/chapters`, async (req, res) => {
    const response4 = await axios.get(`https://bible-go-api.rkeplin.com/v1/books/${req.query.book}/chapters`)
    res.json({chapters: response4.data})
  })

  app.get(`/singleChapter`, async (req, res) => {
    const response5 = await axios.get(`https://bible-go-api.rkeplin.com/v1/books/${req.query.book}/chapters/${req.query.chapter}${req.query.version}`)
    res.json({chapter: response5.data})
  })

  app.get(`/singleVerse`, async (req, res) => {
    const response6 = await axios.get(`https://bible-go-api.rkeplin.com/v1/books/${req.query.book}/chapters/${req.query.chapter}/${req.query.verse}${req.query.version}`)
    res.json({verse: response6.data})

  })

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer(typeDefs, resolvers);
