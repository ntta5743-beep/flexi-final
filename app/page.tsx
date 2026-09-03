'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// بيانات تجريبية للأفلام الـ 100 (سنقوم لاحقاً بجلبها من Supabase بسهولة)
const initialMovies = [
  { id: 1, title: 'Inception (مترجم)', category: 'أكشن', rating: '8.8', year: '2010', country: 'أمريكا', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=60' },
  { id: 2, title: 'Interstellar (مترجم)', category: 'خيال علمي', rating: '8.6', year: '2014', country: 'أمريكا', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=60' },
  { id: 3, title: 'The Conjuring (مترجم)', category: 'رعب', rating: '7.5', year: '2013', country: 'أمريكا', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=60' },
  { id: 4, title: 'The Hangover (مترجم)', category: 'كوميدي', rating: '7.7', year: '2009', country: 'أمريكا', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=60' },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  // تصفية الأفلام بناءً على البحث والنوع (Filter)
  const filteredMovies = initialMovies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' || movie.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#141414] text-white font-sans" dir="rtl">
      {/* 1. شريط التنقل العلوي (Navbar - Netflix Style) */}
      <nav className="flex items-center justify-between px-8 py-4 bg-gradient-to-b from-black/80 to-transparent fixed top-0 w-full z-50">
        <div className="flex items-center gap-8">
          <h1 className="text-red-600 text-3xl font-black tracking-wider cursor-pointer">FLEXI</h1>
          <div className="hidden md:flex gap-6 text-sm text-gray-300">
            <span className="cursor-pointer hover:text-white font-semibold">الرئيسية</span>
            <span className="cursor-pointer hover:text-gray-400">الأفلام</span>
            <span className="cursor-pointer hover:text-gray-400">الأكثر مشاهدة</span>
            <span className="cursor-pointer hover:text-gray-400">الأعلى تقييماً</span>
          </div>
        </div>

        {/* شريط البحث وزر الفلتر */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="بحث عن فيلم..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-black/60 border border-gray-600 px-4 py-1.5 rounded text-sm text-white focus:outline-none focus:border-white w-48 md:w-64 transition"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-zinc-800 border border-gray-600 px-3 py-1.5 rounded text-sm text-white focus:outline-none"
          >
            <option value="الكل">كل التصنيفات</option>
            <option value="أكشن">أكشن</option>
            <option value="رعب">رعب</option>
            <option value="كوميدي">كوميدي</option>
            <option value="خيال علمي">خيال علمي</option>
          </select>
        </div>
      </nav>

      {/* 2. الواجهة البانرية (Hero Section) */}
      <div className="relative h-[70vh] w-full flex items-center px-12 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&auto=format&fit=crop&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/40 to-black/60"></div>
        <div className="relative z-10 max-w-xl space-y-4 pt-20">
          <h2 className="text-5xl font-extrabold tracking-wide">Inception (مترجم)</h2>
          <p className="text-gray-300 text-sm line-clamp-3">
            لص يسرق أسرار الشركات من خلال اختراق الأحلام يُعرض عليه مهمة مستحيلة لزرع فكرة في رأس الرئيس التنفيذي لشركة منافسة.
          </p>
          <div className="flex gap-4 pt-2">
            <Link href="/watch/1" className="bg-white text-black px-6 py-2.5 rounded font-bold flex items-center gap-2 hover:bg-opacity-80 transition">
              ▶ مشاهدة الآن
            </Link>
            <button className="bg-gray-500/70 text-white px-6 py-2.5 rounded font-bold hover:bg-gray-500/50 transition">
              ℹ تفاصيل أكثر
            </button>
          </div>
        </div>
      </div>

      {/* 3. قسم شبكة الأفلام (Movie Grid) */}
      <div className="px-8 py-10 space-y-6">
        <h3 className="text-2xl font-bold border-r-4 border-red-600 pr-3">الأفلام الحديثة والأكثر مشاهدة</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredMovies.map((movie) => (
            <Link href={`/watch/${movie.id}`} key={movie.id} className="group relative bg-zinc-900 rounded-lg overflow-hidden shadow-lg transition transform hover:scale-105 duration-300">
              <div className="aspect-[2/3] w-full overflow-hidden bg-zinc-800">
                <img src={movie.image} alt={movie.title} className="w-full h-full object-cover group-hover:opacity-90 transition" />
              </div>
              <div className="p-3 space-y-1">
                <h4 className="font-semibold text-sm truncate">{movie.title}</h4>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{movie.year}</span>
                  <span className="text-yellow-400 font-bold">★ {movie.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
