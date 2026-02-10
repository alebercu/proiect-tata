const mongoose = require('mongoose');

const PaintingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  imageUrl: { type: String, required: true }, // Aici va fi link-ul de la Cloudinary
  publicId: { type: String }, // Id-ul pozei din Cloudinary (ne va ajuta la ștergere)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Painting', PaintingSchema);