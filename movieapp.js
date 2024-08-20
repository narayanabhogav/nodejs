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
app.get('/addmoviepage',function(req,res){
  res.render('addmoviepage.ejs',{i:1});
})


const addSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  director: { type: String, required: true },
  rating: { type: Number, required: true },
  description: { type: String }
});

const Movies = mongoose.model('Movie', movieSchema);


// Handle POST request to add a movie
app.post('/addmovie', async (req, res) => {
  const { title, year, genre, director, rating, description } = req.body;

  try {
      const newMovie = new Movies({
          title,
          year,
          genre,
          director,
          rating,
          description
      });

      await newMovie.save();
      res.redirect('/'); // Redirect to the movie list or a success page
  } catch (error) {
      console.error('Error adding movie:', error);
      res.status(500).send('Internal Server Error');
  }
});
