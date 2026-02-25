const mongoose = require('mongoose');

const PaintingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  imageUrl: { type: String, required: true },
  publicId: { type: String },
  available: { type: Boolean, default: true }, // Noul câmp!
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Painting', PaintingSchema);