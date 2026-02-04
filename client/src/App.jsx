import React from 'react';
import pozaTata from './assets/poza-tata.jpeg';
import { FaLinkedin, FaFacebook, FaPhoneAlt } from 'react-icons/fa';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Sectiunea de sus */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
          
          {/* Stânga: Poza */}
          <div className="w-full md:w-1/3">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src={pozaTata}
                alt="Ioan Bercu" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Dreapta: Info */}
          <div className="w-full md:w-2/3">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Ioan Bercu</h1>
            <p className="text-xl text-blue-600 font-medium mb-4">Evaluator & Artist</p>
            
            <div className="flex flex-wrap items-center gap-2 text-stone-600 mb-6">
              <p className="font-semibold uppercase tracking-wide">Președinte ANEVAR</p>
              <span className="text-stone-300">|</span>
              <a 
                href="https://neoconsult.ro/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold uppercase tracking-wide hover:text-blue-800 transition-colors"
              >
                Director General Neoconsult Valuation
              </a>
            </div>
            
            <p className="text-gray-600 leading-relaxed mb-8 text-lg italic">
              "Sunt evaluator și Președinte al asociației ANEVAR, o activitate care necesită rigoare, precizie și o înțelegere profundă a cifrelor. Cu toate acestea, am găsit mereu un echilibru în pictură. Pentru mine, pânza este spațiul unde regulile pieței dispar și las locul creativității pure."
            </p>

            {/* Link-uri Social & Contact */}
            <div className="flex flex-col gap-6">
              {/* Rândul cu Social Media */}
              <div className="flex gap-8">
                <a 
                  href="https://www.linkedin.com/in/ioan-bercu-45916492/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-bold hover:text-blue-700 transition-colors uppercase tracking-widest text-sm border-b-2 border-blue-700 pb-1"
                >
                  <FaLinkedin className="text-xl" /> LinkedIn
                </a>

                <a 
                  href="https://www.facebook.com/PROFILUL-LUI" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-bold hover:text-blue-600 transition-colors uppercase tracking-widest text-sm border-b-2 border-blue-600 pb-1"
                >
                  <FaFacebook className="text-xl" /> Facebook
                </a>
              </div>

              {/* Rândul cu Telefon (sub ele, mai mic) */}
              <a 
                href="tel:+407xxxxxxxx" 
                className="flex items-center gap-2 text-stone-500 hover:text-green-700 transition-colors text-sm font-medium tracking-wide"
              >
                <FaPhoneAlt className="text-xs" /> CONTACT DIRECT: +40 7xx xxx xxx
              </a>
            </div>
          </div>
        </div>

        {/* Secțiunea de jos: Articole */}
        <section className="border-t pt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 uppercase tracking-tighter">Apariții în presă</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="https://www.directmm.ro/comunitate/ioan-bercu-cand-excelenta-profesionala-se-impleteste-cu-vibratia-artei/" 
               target="_blank" rel="noopener noreferrer"
               className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
              <span className="text-sm text-gray-400">Octombrie 2025</span>
              <h3 className="text-xl font-semibold mt-2 text-gray-800">Când excelența profesională se împletește cu vibrația artei</h3>
              <p className="text-blue-500 mt-2 text-sm font-medium">Citește articolul →</p>
            </a>
            
            <a href="https://www.directmm.ro/cultura/marian-baroian-si-ioan-bercu-doi-oameni-un-vis-comun/" 
               target="_blank" rel="noopener noreferrer"
               className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
              <span className="text-sm text-gray-400">Octombrie 2025</span>
              <h3 className="text-xl font-semibold mt-2 text-gray-800">Marian Baroian și Ioan Bercu – doi oameni, un vis comun</h3>
              <p className="text-blue-500 mt-2 text-sm font-medium">Citește articolul →</p>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;