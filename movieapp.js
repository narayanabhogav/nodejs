const express = require('express');
const mongoose = require('mongoose');

const path=require('path');
const assert=require('assert');

const app = express();
app.use(express.json())
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

app.set('views',path.join(__dirname,'viewa/'));
app.set('view engine','ejs');

// movie list
// app.get('/',function(req,res){
//     var cursor=db.collection('movies').find({});
//     cursor.toArray(function(err,i){
//         if(err) throw err;

//         res.render('index.ejs',{movies:i});
//     })
// })



app.set('view engine', 'ejs');

app.get('/', async function(req, res) {
    try {
        await client.connect();
        const db = client.db('test');
        const movies = await db.collection('movies').find({}).toArray();
        res.render('index.ejs', { movies: movies });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving movies from the database.");
    } finally {
        // Don't close the client here if you have multiple routes that will use the connection.
        // await client.close(); 
    }
});
