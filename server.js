const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const auth = require('./rotes/authrout');

app.use(express.json());  // Always good to parse JSON

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', auth);  // Mount auth routes at /api

async function main() {
  await mongoose.connect("mongodb+srv://adheethi2003:2ySCBdVEiftjJT6@cluster0.iio96.mongodb.net/");
}

main()
  .then(() => console.log('db connected'))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
