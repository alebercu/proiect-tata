require('dotenv').config();

const upload = require('./cloudinaryConfig');
const Painting = require('./models/Painting');


const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectat la MongoDB"))
  .catch(err => console.log("❌ Eroare la conectare:", err));

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;



app.get('/api/paintings', async (req, res) => {
  try {
    const paintings = await Painting.find().sort({ createdAt: -1 });
    res.json(paintings);
  } catch (err) {
    res.status(500).json({ message: "Eroare la preluarea picturilor" });
  }
});

// Ruta pentru adăugarea unei picturi noi
app.post('/api/paintings', upload.single('image'), async (req, res) => {
  try {
    const { title, price } = req.body;
    
    const newPainting = new Painting({
      title,
      price,
      imageUrl: req.file.path, // Link-ul generat de Cloudinary
      publicId: req.file.filename // ID-ul unic pentru ștergere ulterioară
    });

    await newPainting.save();
    res.status(201).json(newPainting);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Eroare la încărcarea picturii" });
  }
});

app.listen(PORT, () => {
  console.log(`Serverul rulează pe portul ${PORT}`);
});