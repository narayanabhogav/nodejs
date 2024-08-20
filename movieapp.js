const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json());

// MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://narayanabhogavarapu:suryadb@cluster0.wtdbf3f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Define a Mongoose model for movies
const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  genre: String,
});

const Movie = mongoose.model('Movie', movieSchema);

// Movie list
app.get('/', async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.render('index', { movies: movies });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving movies from the database.");
  }
});
