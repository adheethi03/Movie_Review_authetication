const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config(); 

const app = express();
const port = 3000;

const auth = require('./rotes/authrout'); 
const adm = require("./rotes/admin"); 
const usr = require('./rotes/user'); 
const cors = require("cors");

app.use(cors({
  origin: ["http://localhost:5173", "https://chroplex-frontend.vercel.app"],
  credentials: true
}));
app.use(express.json());  // parse JSON

app.get('/', (req, res) => { 
  res.send('Hello World!'); 
}); 
 
app.use('/api', auth);  
app.use("/adm", adm); 
app.use('/usr', usr); 

async function main() { 
  await mongoose.connect("mongodb+srv://adheethi2003:2ySCBdVEiftjJT6@cluster0.iio96.mongodb.net/"); 
}

main()
  .then(() => console.log('db connected'))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`); 
});
