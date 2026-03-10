import React, { useState, useEffect } from 'react'; // Am adăugat useEffect
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios'; // Asigură-te că ai dat npm install axios în client

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [paintings, setPaintings] = useState([]); // Aici vom ține picturile din baza de date
  const [loading, setLoading] = useState(true);

  // Funcția care aduce picturile de la server
  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/paintings');
        setPaintings(response.data);
      } catch (err) {
        console.error("Eroare la încărcarea picturilor:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPaintings();
  }, []);

  if (loading) return <div className="text-center py-20">Se încarcă galeria...</div>;

  return (
    <div className="min-h-screen bg-stone-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-stone-800 mb-4">Galeria de Artă</h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </header>

        {/* Grila de imagini (Folosim paintings în loc de PICTURI_MOCK) */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {paintings.map((pictura, index) => (
            <motion.div
              key={pictura._id} // MongoDB folosește _id
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }} 
              className="break-inside-avoid mb-8"
            >
              <motion.div
                layoutId={`card-${pictura._id}`}
                onClick={() => setSelectedImage(pictura)}
                className="cursor-pointer group relative overflow-hidden rounded-xl bg-white shadow-md"
                whileHover={{ y: -5 }}
              >
                <div className="relative overflow-hidden bg-stone-200">
  <img 
    src={pictura.imageUrl} 
    alt={pictura.title} 
    className="w-full h-auto block object-contain transition-transform duration-500 group-hover:scale-105"
    style={{ maxHeight: '500px' }} // Limităm înălțimea ca să nu ocupe tot ecranul dacă e foarte lungă
  />
</div>
                
                {/* Overlay la hover (Numele) */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <p className="text-white font-medium text-lg text-center leading-tight">
                    {pictura.title}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Fereastra Modală (Aici apare și disponibilitatea) */}
        <AnimatePresence>
          {selectedImage && (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSelectedImage(null)}
      className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-2 md:p-6"
    >
      <motion.div 
        layoutId={`card-${selectedImage._id}`}
        className="bg-white rounded-2xl overflow-hidden max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Partea cu IMAGINEA - O facem flexibilă */}
        <div className="flex-1 bg-stone-100 flex items-center justify-center overflow-hidden p-2">
          <img 
            src={selectedImage.imageUrl} 
            alt={selectedImage.title} 
            className="w-full h-full object-contain" 
            /* object-contain se asigură că poza stă întreagă în spațiul ei fără crop */
          />
        </div>

        {/* Partea cu DETALIILE - O facem să stea fixă în dreapta (sau jos pe mobil) */}
        <div className="w-full md:w-80 p-8 flex flex-col bg-white border-t md:border-t-0 md:border-l border-stone-100">
          <h2 className="text-2xl font-serif font-bold text-stone-800 mb-2 leading-tight">
            {selectedImage.title}
          </h2>
          <div className="w-10 h-1 bg-blue-600 mb-6"></div>
          
          <div className="space-y-4 mb-8">
            <p className="text-xl font-mono text-blue-600">{selectedImage.price}</p>
            
            <div>
              {selectedImage.available ? (
                <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-widest border border-green-100">
                  ● Disponibil
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-red-50 text-red-400 text-[10px] font-bold uppercase tracking-widest border border-red-100">
                  ○ Vândut
                </span>
              )}
            </div>
          </div>
          
          <button 
            onClick={() => setSelectedImage(null)}
            className="mt-auto w-full bg-stone-800 text-white py-3 rounded-xl font-medium hover:bg-stone-700 transition-colors"
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