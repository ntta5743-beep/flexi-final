'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const yearsList = Array.from({ length: 2026 - 1990 + 1 }, (_, i) => (2026 - i).toString());
const categoriesList = ['الكل', 'أكشن', 'رعب', 'كوميدي', 'خيال علمي', 'دراما', 'جريمة', 'مغامرة', 'أنمي', 'غموض', 'إثارة', 'رومنسي', 'وثائقي'];
const countriesList = ['الكل', 'أمريكا', 'بريطانيا', 'كوريا الجنوبية', 'اليابان', 'مصر', 'الهند', 'فرنسا', 'إيطاليا'];

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [selectedYear, setSelectedYear] = useState('الكل');
  const [selectedCountry, setSelectedCountry] = useState('الكل');
  const [selectedRating, setSelectedRating] = useState('الكل');

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const { data, error } = await supabase.from('movies').select('*');
        
        if (error) {
          console.error('خطأ Supabase:', error.message);
          setErrorMsg(error.message);
        } else if (data) {
          console.log('الأفلام المسترجعة:', data);
          setMovies(data);
        }
      } catch (err: any) {
        console.error('خطأ غير متوقع:', err);
        setErrorMsg(err.message || 'حدث خطأ غير متوقع');
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  const trendingMovie = movies.length > 0 ? movies[0] : null;

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title?.toLowerCase().includes(searchTerm.toLowerCase());
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
      
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.95), rgba(0,0,0,0.6))', position: 'fixed', top: 0, width: '100%', boxSizing: 'border-box', zIndex: 1000, flexWrap: 'wrap', gap: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
          <h1 style={{ color: '#E50914', fontSize: '28px', fontWeight: '900', margin: 0, cursor: 'pointer', letterSpacing: '1px' }}>FLEXI</h1>
        </div>
      </nav>

      <div style={{ padding: '120px 40px 40px 40px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', borderRight: '4px solid #E50914', paddingRight: '12px', marginBottom: '25px' }}>
          مكتبة الأفلام ({filteredMovies.length})
        </h3>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px', color: '#aaa' }}>جاري تحميل الأفلام من قاعدة البيانات...</div>
        ) : errorMsg ? (
          <div style={{ textAlign: 'center', padding: '50px', color: '#ff4d4d' }}>حدث خطأ في الاتصال بقاعدة البيانات: {errorMsg}</div>
        ) : filteredMovies.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px', color: '#aaa' }}>
            قاعدة البيانات فارغة أو لا توجد أفلام مطابقة. تأكد من إدخال صف واحد على الأقل في جدول movies عبر Supabase.
          </div>
        ) : (
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
        )}
      </div>

      <style jsx>{`
        .movie-card {
          transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.35s ease !important;
        }
        .movie-card:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 15px 30px rgba(229, 9, 20, 0.35);
          z-index: 10;
        }
      `}</style>
    </div>
  );
}

const movieCardStyle = {
  textDecoration: 'none',
  color: '#fff',
  backgroundColor: '#1a1a1a',
  borderRadius: '6px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
  display: 'block'
};
