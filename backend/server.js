import express from 'express';

const app = express();

app.get('/', (req, res) => {
  console.log('Request from : ', req.ip);
  res.send("Hello World");
  res.sendStatus(200);
  res.send("Hello World 2");
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
  
})