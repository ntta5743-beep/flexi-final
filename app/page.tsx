'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// قائمة أفلام موسعة ومحدثة لتجربة الفلترة والبحث بدقة
const initialMovies = [
  { id: 1, title: 'Inception (مترجم)', category: 'أكشن', rating: 8.8, year: '2010', country: 'أمريكا', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=60' },
  { id: 2, title: 'Interstellar (مترجم)', category: 'خيال علمي', rating: 8.6, year: '2014', country: 'أمريكا', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=60' },
  { id: 3, title: 'The Conjuring (مترجم)', category: 'رعب', rating: 7.5, year: '2013', country: 'أمريكا', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=60' },
  { id: 4, title: 'The Hangover (مترجم)', category: 'كوميدي', rating: 7.7, year: '2009', country: 'أمريكا', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=60' },
  { id: 5, title: 'Parasite (مترجم)', category: 'دراما', rating: 8.5, year: '2019', country: 'كوريا الجنوبية', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&auto=format&fit=crop&q=60' },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [selectedYear, setSelectedYear] = useState('الكل');
  const [selectedCountry, setSelectedCountry] = useState('الكل');
  const [selectedRating, setSelectedRating] = useState('الكل');

  // منطق الفلترة المتقدم والشامل
  const filteredMovies = initialMovies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' || movie.category === selectedCategory;
    const matchesYear = selectedYear === 'الكل' || movie.year === selectedYear;
    const matchesCountry = selectedCountry === 'الكل' || movie.country === selectedCountry;
    
    let matchesRating = true;
    if (selectedRating === '8+') matchesRating = movie.rating >= 8.0;
    if (selectedRating === '7+') matchesRating = movie.rating >= 7.0;

    return matchesSearch && matchesCategory && matchesYear && matchesCountry && matchesRating;
  });

  return (
    <div dir="rtl" style={{ backgroundColor: '#141414', color: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif', margin: 0, padding: 0 }}>
      
      {/* شريط التنقل العلوي */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)', position: 'fixed', top: 0, width: '100%', boxSizing: 'border-box', zIndex: 1000, flexWrap: 'wrap', gap: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <h1 style={{ color: '#E50914', fontSize: '28px', fontWeight: '900', margin: 0, cursor: 'pointer' }}>FLEXI</h1>
          <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#e5e5e5' }}>
            <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>الرئيسية</span>
            <span style={{ cursor: 'pointer' }}>الأفلام</span>
            <span style={{ cursor: 'pointer' }}>الأكثر مشاهدة</span>
            <span style={{ cursor: 'pointer' }}>الأعلى تقييماً</span>
          </div>
        </div>

        {/* شريط البحث */}
        <div>
          <input
            type="text"
            placeholder="ابحث عن فيلمك المفضل..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ backgroundColor: 'rgba(0,0,0,0.6)', border: '1px solid #777', padding: '8px 14px', borderRadius: '4px', color: '#fff', fontSize: '14px', width: '220px', outline: 'none' }}
          />
        </div>
      </nav>

      {/* شريط الفلاتر المتقدمة والمتعددة */}
      <div style={{ padding: '110px 40px 20px 40px', display: 'flex', gap: '15px', flexWrap: 'wrap', backgroundColor: '#181818', borderBottom: '1px solid #282828' }}>
        {/* فلتر النوع */}
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={selectStyle}>
          <option value="الكل">كل التصنيفات (النوع)</option>
          <option value="أكشن">أكشن</option>
          <option value="رعب">رعب</option>
          <option value="كوميدي">كوميدي</option>
          <option value="خيال علمي">خيال علمي</option>
          <option value="دراما">دراما</option>
        </select>

        {/* فلتر السنة */}
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} style={selectStyle}>
          <option value="الكل">كل السنوات</option>
          <option value="2019">2019</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2010">2010</option>
          <option value="2009">2009</option>
        </select>

        {/* فلتر البلد */}
        <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} style={selectStyle}>
          <option value="الكل">كل البلدان</option>
          <option value="أمريكا">أمريكا</option>
          <option value="كوريا الجنوبية">كوريا الجنوبية</option>
        </select>

        {/* فلتر التقييم */}
        <select value={selectedRating} onChange={(e) => setSelectedRating(e.target.value)} style={selectStyle}>
          <option value="الكل">كل التقييمات</option>
          <option value="8+">★ 8.0 فأكثر</option>
          <option value="7+">★ 7.0 فأكثر</option>
        </select>
      </div>

      {/* الواجهة البانرية */}
      <div style={{ position: 'relative', height: '60vh', backgroundImage: `url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&auto=format&fit=crop&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', padding: '0 40px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #141414, rgba(0,0,0,0.4))' }}></div>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '600px' }}>
          <h2 style={{ fontSize: '40px', fontWeight: 'bold', margin: '0 0 15px 0' }}>Inception (مترجم)</h2>
          <p style={{ fontSize: '15px', color: '#ccc', lineHeight: '1.6', margin: '0 0 20px 0' }}>
            لص يسرق أسرار الشركات من خلال اختراق الأحلام يُعرض عليه مهمة مستحيلة لزرع فكرة في رأس الرئيس التنفيذي لشركة منافسة.
          </p>
          <div style={{ display: 'flex', gap: '15px' }}>
            <Link href="/watch/1" style={{ backgroundColor: '#fff', color: '#000', padding: '10px 25px', borderRadius: '4px', fontWeight: 'bold', textDecoration: 'none' }}>
              ▶ مشاهدة الآن
            </Link>
          </div>
        </div>
      </div>

      {/* شبكة الأفلام مع أنيميشن الحركة عند مرور الماوس (Hover Animation) */}
      <div style={{ padding: '40px' }}>
        <h3 style={{ fontSize: '22px', fontWeight: 'bold', borderRight: '4px solid #E50914', paddingRight: '12px', marginBottom: '25px' }}>
          نتائج البحث والأفلام المتاحة ({filteredMovies.length})
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '25px' }}>
          {filteredMovies.map((movie) => (
            <Link 
              href={`/watch/${movie.id}`} 
              key={movie.id} 
              style={movieCardStyle}
              className="movie-card"
            >
              <div style={{ height: '280px', backgroundColor: '#222', overflow: 'hidden' }}>
                <img src={movie.image} alt={movie.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} />
              </div>
              <div style={{ padding: '12px' }}>
                <h4 style={{ fontSize: '14px', margin: '0 0 8px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{movie.title}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#aaa' }}>
                  <span>{movie.year} - {movie.country}</span>
                  <span style={{ color: '#f5c518', fontWeight: 'bold' }}>★ {movie.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* أنيميشن CSS مدمج لتفاعل الماوس السلس */}
      <style jsx>{`
        .movie-card:hover {
          transform: scale(1.06);
          box-shadow: 0 10px 20px rgba(229, 9, 20, 0.3);
          z-index: 10;
        }
        .movie-card:hover img {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}

const selectStyle = {
  backgroundColor: '#222',
  border: '1px solid #555',
  padding: '8px 14px',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '14px',
  outline: 'none',
  cursor: 'pointer'
};

const movieCardStyle = {
  textDecoration: 'none',
  color: '#fff',
  backgroundColor: '#1f1f1f',
  borderRadius: '6px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
  display: 'block'
};
