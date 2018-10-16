const express = require('express');
const mongoose = require('mongoose');

// create a variable to require our api routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// express app
const app = express();
 
// DB Config by requiring keys file
const db = require('./config/keys').mongoURI;
// Connect to MongoDB through Mongoose
mongoose
   .connect(db)
   .then(() => console.log('MongoDB Connected'))
   .catch(err => console.log(err));

 app.get('/', (req, res) => res.send('Hello World'));
 
// use api routes, linking route variables from above
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// set port variable, using || or
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`))