const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');

/* IMPORT OTHER ROUTES  */
const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const postRoute = require('./routes/post.route');

/* DOTENV CONFIG FOR ENVIRONMENT VARIABLES */
require('dotenv').config();

/* ENVIRONMENT VARIABLES */
const MONGO_URL = process.env.MONGO_URL_PROD;
const PORT = process.env.PORT || 5000;

const app = express()

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

mongoose.connection.on('open', function(error) {
  if (error)throw error;
  console.log('Database connected!');
})

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}));

app.use('/user', userRoute);
app.use('/auth', authRoute);
app.use('/post', postRoute);

app.get('/', (req, res)=> {
  res.send('index');
});

app.get('*', (req, res)=> {
  res.send('404, not found!');
});

app.listen(PORT, function() {
  console.log(`Connected on port ${PORT}!`)
})