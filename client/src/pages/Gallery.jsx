import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PICTURI_MOCK = [
  { id: 1, titlu: "Amurg în Maramureș", pret: "1200 RON", imagine: "https://via.placeholder.com/600x800" },
  { id: 2, titlu: "Rigoare și Haos", pret: "1500 RON", imagine: "https://via.placeholder.com/600x800" },
  { id: 3, titlu: "Structuri Urbane", pret: "900 RON", imagine: "https://via.placeholder.com/600x800" },
  { id: 4, titlu: "Liniștea de după cifre", pret: "2000 RON", imagine: "https://via.placeholder.com/600x800" },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="min-h-screen bg-stone-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-stone-800 mb-4">Galeria de Artă</h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </header>

        {/* Grila de imagini (fără prețuri la vedere) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PICTURI_MOCK.map((pictura, index) => (
  <motion.div
    key={pictura.id}
    // REINTRODUCEM CURGEREA AICI
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }} 
    className="relative"
  >
    <motion.div
      layoutId={`card-${pictura.id}`} // MĂRIREA RĂMÂNE PE ELEMENTUL INTERIOR
      onClick={() => setSelectedImage(pictura)}
      className="cursor-pointer group relative overflow-hidden rounded-xl bg-white shadow-md"
      whileHover={{ y: -5 }}
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img 
          src={pictura.imagine} 
          alt={pictura.titlu} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      {/* Overlay la hover */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
        <p className="text-white font-medium text-lg text-center leading-tight">
          {pictura.titlu}
        </p>
      </div>
    </motion.div>
  </motion.div>
))}
        </div>

        {/* Fereastra Modală (Overlay-ul care apare la click) */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 md:p-10"
            >
              <motion.div 
                layoutId={`card-${selectedImage.id}`}
                className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row"
                onClick={(e) => e.stopPropagation()} // Împiedică închiderea când dai click pe card
              >
                {/* Imaginea mare */}
                <div className="md:w-2/3 bg-stone-200">
                  <img 
                    src={selectedImage.imagine} 
                    alt={selectedImage.titlu} 
                    className="w-full h-full object-contain max-h-[70vh] md:max-h-none"
                  />
                </div>

                {/* Detalii în Modal */}
                <div className="md:w-1/3 p-8 flex flex-col justify-center">
                  <h2 className="text-3xl font-serif font-bold text-stone-800 mb-2">
                    {selectedImage.titlu}
                  </h2>
                  <div className="w-12 h-1 bg-blue-600 mb-6"></div>
                  <p className="text-2xl font-mono text-blue-600 mb-8">{selectedImage.pret}</p>
                  
                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="mt-auto bg-stone-800 text-white py-3 rounded-lg hover:bg-stone-700 transition"
                  >
                    Închide
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}