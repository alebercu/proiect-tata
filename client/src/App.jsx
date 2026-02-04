import React from 'react';
import pozaTata from './assets/poza-tata.jpeg';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Container Principal */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Sectiunea de sus: Poza + Descriere */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
          
          {/* Stânga: Poza */}
          <div className="w-full md:w-1/3">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src={pozaTata}
                alt="Portret" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Dreapta: Info + Social */}
          <div className="w-full md:w-2/3">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Ioan Bercu</h1>
            <p className="text-xl text-blue-600 font-medium mb-6">Evaluator & Artist</p>
            
            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              {/* Aici vei scrie descrierea făcută de tine */}
              "Sunt om de afaceri și Președinte al asociației ANEVAR, o activitate care necesită rigoare, precizie și o înțelegere profundă a cifrelor. Cu toate acestea, am găsit mereu un echilibru în pictură. Pentru mine, pânza este spațiul unde regulile pieței dispar și las locul creativității pure. Acest site este modul meu de a împărtăși cele două lumi care mă definesc: profesionalismul din mediul asociativ și libertatea culorilor."
            </p>

            <div className="flex gap-4">
              <a href="#" className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition">LinkedIn</a>
              <a href="#" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">Facebook</a>
            </div>
          </div>
        </div>

        {/* Secțiunea de jos: Articole */}
        <section className="border-t pt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Apariții în presă & Articole</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Exemplu de articol */}
            <a href="#" className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
              <span className="text-sm text-gray-400">12 Mai 2023</span>
              <h3 className="text-xl font-semibold mt-2">Titlu Articol despre Afaceri sau Pictură</h3>
              <p className="text-blue-500 mt-2">Citește articolul →</p>
            </a>
            {/* Mai poți adăuga altele la fel */}
          </div>
        </section>

      </main>
    </div>
  );
}

export default App;