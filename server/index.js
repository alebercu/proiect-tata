const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Serverul rulează!');
});

app.listen(PORT, () => {
  console.log(`Server pornit pe portul ${PORT}`);
});