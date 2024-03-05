const express = require('express');
const cookieParser = require('cookie-parser');
const { graphqlHTTP } = require('express-graphql');
const dotenv = require('dotenv').config();
const colors = require('colors');
const cors = require('cors');
const connectDB = require('./config/db');
const schema = require('./schema/schema');
const { protect } = require('./middleware/authMiddleware');
const userRoute = require('./routes/userRoute');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
connectDB();

const corsOptions = {
  // origin: 'http://localhost:3000',
  origin: 'https://school-project-frontend.vercel.app/',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRoute);
app.use(
  '/graphql',
  protect,
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server started on port: ${port}`));
