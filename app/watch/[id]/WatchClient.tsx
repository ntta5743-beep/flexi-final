'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface WatchClientProps {
  id: string;
}

export default function WatchClient({ id }: WatchClientProps) {
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeServer, setActiveServer] = useState<'server1' | 'server2'>('server1');
  const [selectedQuality, setSelectedQuality] = useState('1080p');

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const { data, error } = await supabase
          .from('movies')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('خطأ في جلب تفاصيل الفيلم:', error);
        } else if (data) {
          setMovie(data);
        }
      } catch (err) {
        console.error('خطأ غير متوقع:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div style={{ backgroundColor: '#141414', color: '#fff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>جاري تحميل الفيلم...</div>;
  }

  if (!movie) {
    return (
      <div style={{ backgroundColor: '#141414', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
        <h2>عذراً، هذا الفيلم غير موجود في قاعدة البيانات!</h2>
        <Link href="/" style={{ color: '#E50914', textDecoration: 'underline' }}>العودة للرئيسية</Link>
      </div>
    );
  }

  // الروابط الحقيقية المستخرجة من جدول Supabase
  const currentVideoUrl = activeServer === 'server1' ? movie.video_url : (movie.server2_url || movie.video_url);

  return (
    <div dir="rtl" style={{ backgroundColor: '#141414', color: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif', margin: 0, paddingBottom: '50px' }}>
      
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', backgroundColor: '#000', borderBottom: '1px solid #222' }}>
        <Link href="/" style={{ color: '#E50914', fontSize: '24px', fontWeight: '900', textDecoration: 'none' }}>FLEXI</Link>
        <Link href="/" style={{ color: '#aaa', fontSize: '14px', textDecoration: 'none' }}>← العودة للرئيسية</Link>
      </nav>

      <div style={{ maxWidth: '1000px', margin: '30px auto', padding: '0 20px' }}>
        
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '15px' }}>{movie.title}</h1>

        {/* مشغل الفيديو السينمائي */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', backgroundColor: '#000', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.8)' }}>
          <video 
            key={currentVideoUrl}
            controls 
            autoPlay
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            src={currentVideoUrl}
          >
            متصفحك لا يدعم مشغل الفيديو.
          </video>
        </div>

        {/* لوحة التحكم والتحويل بين السيرفرات وجودة الفيديو */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap', gap: '15px', backgroundColor: '#1f1f1f', padding: '15px 20px', borderRadius: '8px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '13px', color: '#aaa' }}>سيرفرات المشاهدة:</span>
            <button 
              onClick={() => setActiveServer('server1')}
              style={{ padding: '8px 16px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', border: 'none', backgroundColor: activeServer === 'server1' ? '#E50914' : '#333', color: '#fff' }}
            >
              السيرفر الأساسي (1)
            </button>
            <button 
              onClick={() => setActiveServer('server2')}
              style={{ padding: '8px 16px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', border: 'none', backgroundColor: activeServer === 'server2' ? '#E50914' : '#333', color: '#fff' }}
            >
              السيرفر الاحتياطي (2)
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', color: '#aaa' }}>الجودة:</span>
              <select 
                value={selectedQuality} 
                onChange={(e) => setSelectedQuality(e.target.value)}
                style={{ backgroundColor: '#333', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', outline: 'none', cursor: 'pointer' }}
              >
                <option value="1080p">1080p FHD</option>
                <option value="720p">720p HD</option>
                <option value="480p">480p SD</option>
                <option value="auto">تلقائي (دينايمكي)</option>
              </select>
            </div>

            <a 
              href={currentVideoUrl} 
              download 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ backgroundColor: '#28a745', color: '#fff', padding: '8px 18px', borderRadius: '4px', fontWeight: 'bold', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}
            >
              📥 تحميل الفيلم
            </a>
          </div>

        </div>

        {/* تفاصيل ومعلومات الفيلم */}
        <div style={{ marginTop: '25px', backgroundColor: '#1a1a1a', padding: '25px', borderRadius: '8px', border: '1px solid #333' }}>
          <div style={{ display: 'flex', gap: '15px', fontSize: '13px', color: '#aaa', marginBottom: '12px', flexWrap: 'wrap' }}>
            <span style={{ backgroundColor: '#333', padding: '3px 8px', borderRadius: '4px', color: '#fff' }}>{movie.category}</span>
            <span>سنة الإنتاج: {movie.year}</span>
            <span>البلد: {movie.country}</span>
            <span style={{ color: '#f5c518', fontWeight: 'bold' }}>★ {movie.rating} / 10</span>
          </div>
          <p style={{ fontSize: '15px', lineHeight: '1.7', color: '#ddd', margin: 0 }}>
            {movie.description}
          </p>
        </div>

      </div>
    </div>
  );
}
