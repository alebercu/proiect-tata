import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function AdminUpload() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [available, setAvailable] = useState(true);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paintings, setPaintings] = useState([]);
  const [editingId, setEditingId] = useState(null); // ID-ul picturii pe care o edităm

  const fetchPaintings = async () => {
    const res = await axios.get('http://localhost:5001/api/paintings');
    setPaintings(res.data);
  };

  useEffect(() => { fetchPaintings(); }, []);

  // Funcția care pregătește formularul pentru editare
  const startEdit = (p) => {
    setEditingId(p._id);
    setTitle(p.title);
    setPrice(p.price);
    setAvailable(p.available);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Te duce sus la formular
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle(''); setPrice(''); setAvailable(true); setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('available', available);
    if (image) formData.append('image', image);

    try {
      if (editingId) {
        // Editare
        await axios.post(`http://localhost:5001/api/paintings/update/${editingId}`, formData);
        alert('Modificări salvate!');
      } else {
        // Creare Nouă
        await axios.post('http://localhost:5001/api/paintings', formData);
        alert('Pictură adăugată!');
      }
      cancelEdit();
      fetchPaintings();
    } catch (err) {
      alert('Eroare!');
    } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Ștergi definitiv?")) {
      await axios.delete(`http://localhost:5001/api/paintings/${id}`);
      fetchPaintings();
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 py-12 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* FORMULAR DINAMIC */}
        <motion.div className={`p-8 rounded-3xl shadow-xl h-fit border-2 transition-colors ${editingId ? 'bg-blue-50 border-blue-200' : 'bg-white border-transparent'}`}>
          <h2 className="text-2xl font-bold mb-4">{editingId ? 'Editează Pictura' : 'Adaugă Pictură'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Titlu" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 border rounded-xl outline-none shadow-sm" required />
            <input type="text" placeholder="Preț" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-3 border rounded-xl outline-none shadow-sm" required />
            <div className="flex items-center gap-2 p-3 bg-white/50 rounded-lg border">
                <input type="checkbox" id="av" checked={available} onChange={e => setAvailable(e.target.checked)} className="w-5 h-5" />
                <label htmlFor="av" className="text-sm font-medium">Disponibilă pentru vânzare</label>
            </div>
            <div className="text-xs text-stone-500 italic">
              {editingId ? "Lasă gol dacă nu vrei să schimbi poza" : "Imaginea este obligatorie"}
            </div>
            <input type="file" onChange={e => setImage(e.target.files[0])} className="w-full text-sm" required={!editingId} />
            
            <div className="flex gap-2">
              <button className={`flex-1 py-3 rounded-xl font-bold text-white transition-all ${editingId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
                {loading ? 'Procesare...' : (editingId ? 'Actualizează' : 'Publică')}
              </button>
              {editingId && (
                <button type="button" onClick={cancelEdit} className="px-4 py-3 bg-stone-300 rounded-xl font-bold text-stone-700">X</button>
              )}
            </div>
          </form>
        </motion.div>

        {/* LISTĂ GESTIONARE */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-stone-800">Galerie Actuală</h2>
          <div className="max-h-[600px] overflow-y-auto space-y-3 pr-2">
            {paintings.map(p => (
              <div key={p._id} className="bg-white p-3 rounded-2xl shadow flex items-center gap-4 hover:shadow-md transition-shadow">
                <img src={p.imageUrl} alt="" className="w-14 h-14 object-cover rounded-lg shadow-inner" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm truncate">{p.title}</h3>
                  <p className={`text-[10px] font-bold uppercase ${p.available ? 'text-green-600' : 'text-red-400'}`}>
                    {p.available ? '● Disponibil' : '○ Vândut'}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => startEdit(p)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">✎</button>
                  <button onClick={() => handleDelete(p._id)} className="p-2 bg-red-50 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-colors">✕</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}