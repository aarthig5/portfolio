// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.get('/api/:search', async (req, res) => {
  console.log('GET request detected');

  const head = 'http://www.omdbapi.com/?s='
  const api_key = '&apikey=3444e26e';
  const search_val = req.params['search']

  const API_URL = head + search_val + api_key

  const data = await fetch(API_URL);

  const json = await data.json();
  console.log('fetch request data', json);
  res.json(json);
});



app.post('/api', async (req, res) => {

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
