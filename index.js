const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Book = require('./Book')
const port = 9000;


///middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));


//mongodb connection
const db = 'mongodb+srv://okitadamian5566:damian20@cluster0.4rg88.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(db)
.then( result => console.log('connected...'))
.catch(error => handleerror(error.message));

function handleerror(error) {
  console.log(error)
}

app.get('/api/books', async (req, res) => {
  const book = await Book.find().exec()
  res.send(book)
});


app.get('/api/books/:id', async (req, res) => {
  const id = req.params.id
  const book = await
  Book.findById(id);
  if (!book) return res.status(404).send('book not found');
  res.json(book);
});

app.post('/api/books', async (req, res) => {
  const book = new Book(req.body);
  try {
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json ({message: 'Error creating book'})
  }
});

app.put('/api/books/:id', async (req, res) => {
  const id = req.params.id
  const updateBook = req.body;
   try {
    const book = await
    Book.findByIdAndUpdate(id, updateBook, { new: true});
    res.json(book);
   } catch (error ) {
    res.status(404).json({message: 'book not found'});
   }
});


app.delete('/api/books/:id', async (req, res) => {
  const id = req.params.id
  try {
    await 
    Book.findByIdAndDelete(id);

    const book = res.status(204).send('book deleted');
  } catch (error) {
    res.status(404).json('book not found');
  }
});

app.listen(port, () => console.log(`server running on port ${port}`));

