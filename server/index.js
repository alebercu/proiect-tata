require('dotenv').config();

const cloudinary = require('cloudinary').v2;

const upload = require('./cloudinaryConfig');
const Painting = require('./models/Painting');
const Article = require('./models/Article');


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

// Ruta pentru Editare (Update)
app.post('/api/paintings/update/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, price, available } = req.body;
    const updateData = { title, price, available: available === 'true' || available === true };

    // Dacă utilizatorul a încărcat o imagine NOUĂ
    if (req.file) {
      const oldPainting = await Painting.findById(req.params.id);
      // Ștergem poza veche din Cloudinary
      if (oldPainting.publicId) {
        await cloudinary.uploader.destroy(oldPainting.publicId);
      }
      updateData.imageUrl = req.file.path;
      updateData.publicId = req.file.filename;
    }

    const updatedPainting = await Painting.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedPainting);
  } catch (error) {
    res.status(500).json({ message: "Eroare la actualizare" });
  }
});

app.delete('/api/paintings/:id', async (req, res) => {
  try {
    const painting = await Painting.findById(req.params.id);
    if (!painting) return res.status(404).json({ message: "Pictura nu a fost găsită" });

    // 1. Ștergem imaginea din Cloudinary folosind publicId
    if (painting.publicId) {
      await cloudinary.uploader.destroy(painting.publicId);
    }

    // 2. Ștergem documentul din MongoDB
    await Painting.findByIdAndDelete(req.params.id);

    res.json({ message: "Pictura a fost ștearsă cu succes!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Eroare la ștergere" });
  }
});

// --- RUTE ARTICOLE ---

// Ia toate articolele
app.get('/api/articles', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: "Eroare la preluarea articolelor" });
  }
});

// Adaugă articol nou
app.post('/api/articles', async (req, res) => {
  try {
    const newArticle = new Article(req.body);
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(500).json({ message: "Eroare la salvare" });
  }
});

// Șterge articol
app.delete('/api/articles/:id', async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Articol șters" });
  } catch (err) {
    res.status(500).json({ message: "Eroare la ștergere" });
  }
});

app.listen(PORT, () => {
  console.log(`Serverul rulează pe portul ${PORT}`);
});