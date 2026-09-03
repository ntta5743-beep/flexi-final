'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const yearsList = Array.from({ length: 2026 - 1990 + 1 }, (_, i) => (2026 - i).toString());

const categoriesList = ['الكل', 'أكشن', 'رعب', 'كوميدي', 'خيال علمي', 'دراما', 'جريمة', 'مغامرة', 'أنمي', 'غموض', 'إثارة', 'رومنسي', 'وثائقي'];
const countriesList = ['الكل', 'أمريكا', 'بريطانيا', 'كوريا الجنوبية', 'اليابان', 'مصر', 'الهند', 'فرنسا', 'إيطاليا'];

const initialMovies = [
  { id: 1, title: 'Inception مترجم', category: 'أكشن', rating: 8.8, year: '2010', country: 'أمريكا', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=60', isTrending: true, description: 'لص يسرق أسرار الشركات من خلال اختراق الأحلام يُعرض عليه مهمة مستحيلة لزرع فكرة في رأس الرئيس التنفيذي.' },
  { id: 2, title: 'Interstellar مترجم', category: 'خيال علمي', rating: 8.6, year: '2014', country: 'أمريكا', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=60', isTrending: false, description: 'فريق من استكشاف الفضاء يسافر عبر ثقب دودي محاولاً إنقاذ البشرية وبحث عن كوكب صالح للعيش.' },
  { id: 3, title: 'The Conjuring مترجم', category: 'رعب', rating: 7.5, year: '2013', country: 'أمريكا', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=60', isTrending: false, description: 'محققان في الظواهر الخارقة يمحصان في قساوة أرواح شريرة ترهب عائلة مسالمة في منزلها الريفي.' },
  { id: 4, title: 'Parasite مترجم', category: 'دراما', rating: 8.5, year: '2019', country: 'كوريا الجنوبية', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&auto=format&fit=crop&q=60', isTrending: false, description: 'عائلة فقيرة تتسلل بطرق ذكية للعمل لدى عائلة غنية، وتتوالى الأحداث في قالب مثير وغير متوقع.' }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [selectedYear, setSelectedYear] = useState('الكل');
  const [selectedCountry, setSelectedCountry] = useState('الكل');
  const [selectedRating, setSelectedRating] = useState('الكل');

  const trendingMovie = initialMovies.find(m => m.isTrending) || initialMovies[0];

  const filteredMovies = initialMovies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' || movie.category === selectedCategory;
    const matchesYear = selectedYear === 'الكل' || movie.year === selectedYear;
    const matchesCountry = selectedCountry === 'الكل' || movie.country === selectedCountry;
    
    let matchesRating = true;
    if (selectedRating === '9+') matchesRating = movie.rating >= 9.0;
    if (selectedRating === '8+') matchesRating = movie.rating >= 8.0;
    if (selectedRating === '7+') matchesRating = movie.rating >= 7.0;

    return matchesSearch && matchesCategory && matchesYear && matchesCountry && matchesRating;
  });

  return (
    <div dir="rtl" style={{ backgroundColor: '#141414', color: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif', margin: 0, padding: 0 }}>
      
      {/* شريط التنقل العلوي والفلاتر */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.95), rgba(0,0,0,0.6))', position: 'fixed', top: 0, width: '100%', boxSizing: 'border-box', zIndex: 1000, flexWrap: 'wrap', gap: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
          <h1 style={{ color: '#E50914', fontSize: '28px', fontWeight: '900', margin: 0, cursor: 'pointer', letterSpacing: '1px' }}>FLEXI</h1>
          <div style={{ display: 'flex', gap: '15px', fontSize: '13px', color: '#e5e5e5' }}>
            <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>الرئيسية</span>
            <span style={{ cursor: 'pointer' }}>الأفلام</span>
            <span style={{ cursor: 'pointer' }}>الأكثر مشاهدة</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="ابحث عن فيلم..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ backgroundColor: 'rgba(0,0,0,0.7)', border: '1px solid #555', padding: '7px 12px', borderRadius: '4px', color: '#fff', fontSize: '13px', width: '160px', outline: 'none' }}
          />

          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={selectStyle}>
            <option value="الكل">كل الأنواع</option>
            {categoriesList.filter(c => c !== 'الكل').map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} style={selectStyle}>
            <option value="الكل">كل السنوات</option>
            {yearsList.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} style={selectStyle}>
            <option value="الكل">كل البلدان</option>
            {countriesList.filter(c => c !== 'الكل').map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>

          <select value={selectedRating} onChange={(e) => setSelectedRating(e.target.value)} style={selectStyle}>
            <option value="الكل">كل التقييمات</option>
            <option value="9+">★ 9+ ممتاز</option>
            <option value="8+">★ 8+ عالي جداً</option>
            <option value="7+">★ 7+ جيد جداً</option>
          </select>
        </div>
      </nav>

      {/* الواجهة البانرية الديناميكية */}
      <div style={{ position: 'relative', height: '65vh', backgroundImage: `url('${trendingMovie.image}')`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', padding: '0 40px', paddingTop: '60px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #141414 10%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.8) 100%)' }}></div>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '650px' }}>
          <div style={{ display: 'inline-block', backgroundColor: '#E50914', color: '#fff', padding: '3px 10px', borderRadius: '3px', fontSize: '11px', fontWeight: 'bold', marginBottom: '10px' }}>
             الفيلم الرائج والأكثر مشاهدة حالياً
          </div>
          <h2 style={{ fontSize: '42px', fontWeight: 'bold', margin: '0 0 12px 0' }}>{trendingMovie.title}</h2>
          <p style={{ fontSize: '15px', color: '#ddd', lineHeight: '1.6', margin: '0 0 20px 0' }}>
            {trendingMovie.description}
          </p>
          <div style={{ display: 'flex', gap: '15px' }}>
            <Link href={`/watch/${trendingMovie.id}`} style={{ backgroundColor: '#fff', color: '#000', padding: '10px 25px', borderRadius: '4px', fontWeight: 'bold', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ▶ مشاهدة الآن
            </Link>
          </div>
        </div>
      </div>

      {/* شبكة الأفلام مع أنيميشن التمرير الأنيق */}
      <div style={{ padding: '40px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', borderRight: '4px solid #E50914', paddingRight: '12px', marginBottom: '25px' }}>
          نتائج الأفلام المعروضة ({filteredMovies.length})
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
                <img src={movie.image} alt={movie.title} className="movie-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '12px' }}>
                <h4 style={{ fontSize: '14px', margin: '0 0 8px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{movie.title}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#aaa' }}>
                  <span>{movie.year} | {movie.country}</span>
                  <span style={{ color: '#f5c518', fontWeight: 'bold' }}>★ {movie.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* أنيميشن نابع من الفخامة لتفاعل الماوس */}
      <style jsx>{`
        .movie-card {
          transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.35s ease !important;
        }
        .movie-card:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 15px 30px rgba(229, 9, 20, 0.35);
          z-index: 10;
        }
        .movie-img {
          transition: transform 0.4s ease !important;
        }
        .movie-card:hover .movie-img {
          transform: scale(1.08);
        }
      `}</style>
    </div>
  );
}

const selectStyle = {
  backgroundColor: '#1a1a1a',
  border: '1px solid #444',
  padding: '7px 10px',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '12px',
  outline: 'none',
  cursor: 'pointer'
};

const movieCardStyle = {
  textDecoration: 'none',
  color: '#fff',
  backgroundColor: '#1a1a1a',
  borderRadius: '6px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
  display: 'block'
};
