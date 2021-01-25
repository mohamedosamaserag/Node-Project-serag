const express = require('express');
const app = express();

const mongoose = require('mongoose');
const { router } = require('./routes');

const url = 'mongodb+srv://seragmo:mo2281037@cluster0.4y0cr.mongodb.net/Blog?';
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Database Connected Successfully'))
  .catch((err) => console.log(err));

// mongoose.connect('mongodb://localhost:27017/Blog', { useNewUrlParser: true });

app.use(express.json());

// const { PORT = 8000 } = process.env;

app.use('/', router);

//not found middleware
app.get('*', (req, res, next) => {
  res.send('Not-Found');
});

app.get((err, req, res, next) => {
  console.log(err);
  if (err.code === 11000) {
    res.status(402).send('There was a duplicate key error');
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(422).json(err.errors);
  }
  if (err.code === 11000) {
    res
      .status(422)
      .json({ statusCode: 'ValidationError', property: err.keyValue });
  }
  if (err.message === 'UN_AUTHENTICATED') {
    res.status(401).json({ statusCode: 'UN_AUTHENTICATED' });
  }
  if (err.message === 'UN_AUTHENTICATED') {
    res.status(400).json({ statusCode: 'Bad request' });
  }
  res.status(503).end();
});

// app.listen(PORT, () => {
//   console.log('Running on port : ', PORT);
// });

// app.listen(PORT,()=>{
//   console
// })

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log('listen to port', PORT);
});
