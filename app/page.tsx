'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const initialMovies = [
  { id: 1, title: 'Inception (مترجم)', category: 'أكشن', rating: '8.8', year: '2010', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=60' },
  { id: 2, title: 'Interstellar (مترجم)', category: 'خيال علمي', rating: '8.6', year: '2014', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=60' },
  { id: 3, title: 'The Conjuring (مترجم)', category: 'رعب', rating: '7.5', year: '2013', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=60' },
  { id: 4, title: 'The Hangover (مترجم)', category: 'كوميدي', rating: '7.7', year: '2009', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=60' },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const filteredMovies = initialMovies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' || movie.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div dir="rtl" style={{ backgroundColor: '#141414', color: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif', margin: 0, padding: 0 }}>
      {/* شريط التنقل العلوي */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)', position: 'fixed', top: 0, width: '100%', boxSizing: 'border-box', zIndex: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <h1 style={{ color: '#E50914', fontSize: '28px', fontWeight: '900', margin: 0, cursor: 'pointer' }}>FLEXI</h1>
          <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#e5e5e5' }}>
            <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>الرئيسية</span>
            <span style={{ cursor: 'pointer' }}>الأفلام</span>
            <span style={{ cursor: 'pointer' }}>الأكثر مشاهدة</span>
            <span style={{ cursor: 'pointer' }}>الأعلى تقييماً</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="بحث عن فيلم..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ backgroundColor: 'rgba(0,0,0,0.6)', border: '1px solid #777', padding: '8px 12px', borderRadius: '4px', color: '#fff', fontSize: '14px', width: '200px', outline: 'none' }}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ backgroundColor: '#222', border: '1px solid #777', padding: '8px 12px', borderRadius: '4px', color: '#fff', fontSize: '14px', outline: 'none' }}
          >
            <option value="الكل">كل التصنيفات</option>
            <option value="أكشن">أكشن</option>
            <option value="رعب">رعب</option>
            <option value="كوميدي">كوميدي</option>
            <option value="خيال علمي">خيال علمي</option>
          </select>
        </div>
      </nav>

      {/* الواجهة البانرية */}
      <div style={{ position: 'relative', height: '65vh', backgroundImage: `url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&auto=format&fit=crop&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', padding: '0 40px', paddingTop: '80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #141414, rgba(0,0,0,0.4))' }}></div>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '600px' }}>
          <h2 style={{ fontSize: '42px', fontWeight: 'bold', margin: '0 0 15px 0' }}>Inception (مترجم)</h2>
          <p style={{ fontSize: '15px', color: '#ccc', lineHeight: '1.6', margin: '0 0 20px 0' }}>
            لص يسرق أسرار الشركات من خلال اختراق الأحلام يُعرض عليه مهمة مستحيلة لزرع فكرة في رأس الرئيس التنفيذي لشركة منافسة.
          </p>
          <div style={{ display: 'flex', gap: '15px' }}>
            <Link href="/watch/1" style={{ backgroundColor: '#fff', color: '#000', padding: '10px 25px', borderRadius: '4px', fontWeight: 'bold', textDecoration: 'none', display: 'inline-block' }}>
              ▶ مشاهدة الآن
            </Link>
            <button style={{ backgroundColor: 'rgba(109, 109, 110, 0.7)', color: '#fff', padding: '10px 25px', borderRadius: '4px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
              ℹ تفاصيل أكثر
            </button>
          </div>
        </div>
      </div>

      {/* قسم شبكة الأفلام */}
      <div style={{ padding: '40px' }}>
        <h3 style={{ fontSize: '22px', fontWeight: 'bold', borderRight: '4px solid #E50914', paddingRight: '12px', marginBottom: '25px' }}>
          الأفلام الحديثة والأكثر مشاهدة
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          {filteredMovies.map((movie) => (
            <Link href={`/watch/${movie.id}`} key={movie.id} style={{ textDecoration: 'none', color: '#fff', backgroundColor: '#1f1f1f', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.3)', transition: 'transform 0.3s' }}>
              <div style={{ height: '280px', backgroundColor: '#333', overflow: 'hidden' }}>
                <img src={movie.image} alt={movie.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '12px' }}>
                <h4 style={{ fontSize: '14px', margin: '0 0 8px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{movie.title}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#aaa' }}>
                  <span>{movie.year}</span>
                  <span style={{ color: '#f5c518', fontWeight: 'bold' }}>★ {movie.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
