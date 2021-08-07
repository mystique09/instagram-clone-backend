const express = require('express')
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');

/* DOTENV CONFIG FOR ENVIRONMENT VARIABLES */
require('dotenv').config();

/* ENVIRONMENT VARIABLES */
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;

/* IMPORT OTHER ROUTES  */
const userRoute = require('./routes/user.route');

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

app.get('/', (req, res)=> {
  res.send('index');
});

app.get('*', (req, res)=> {
  res.send('404, not found!');
});

app.listen(PORT, function() {
  console.log(`Connected on port ${PORT}!`)
})