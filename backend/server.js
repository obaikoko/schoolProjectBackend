const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const dotenv = require('dotenv').config();
const colors = require('colors');
const cors = require('cors');
const connectDB = require('./config/db');
const schema = require('./schema/schema');

const app = express();
connectDB();
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server started on port: ${port}`));
