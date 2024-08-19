const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json())
// MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://narayanabhogavarapu:suryadb@cluster0.wtdbf3f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.post('/addbrands',async(req,res)=>{
    const {brandname}=req.body;
    try{
        const newData=new BrandName({brandname});
        await newData.save();
        return res.json( await BrandName.find());
    }
    catch(err){
        console.log(err.message);
    }
})