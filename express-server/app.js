const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./models/Role');

const roleRoutes = require('./routes/roles');
const userRoutes = require('./routes/users');
const roomRoutes = require('./routes/rooms');
const reservationRoutes = require('./routes/reservations');
// const commentsRoutes = require('./routes/comments');

const app = express();

// dzWN4SPNnX2gqzfh
// mongodb+srv://max:<process.env.MONGO_ATLAS_PW>@cluster0-nafr7.mongodb.net/node-angular
mongoose
  .connect('mongodb://localhost:27017/user-role', { useNewUrlParser: true })
  // .connect('mongodb+srv://max:' + process.env.MONGO_ATLAS_PW + '@cluster0-nafr7.mongodb.net/node-angular')
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/reservations', reservationRoutes);
// app.use('/api/posts/comments', commentsRoutes);

module.exports = app;
