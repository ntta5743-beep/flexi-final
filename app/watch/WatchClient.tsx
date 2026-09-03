'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://puqvjdrqefzhqavhryso.supabase.co';
const supabaseAnonKey = 'sb_publishable_WHA1Rx2KQStqfIfy0j5vtw__0ra0pl_';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function WatchClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeServer, setActiveServer] = useState<'server1' | 'server2'>('server1');

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    
    async function fetchMovieDetails() {
      try {
        setLoading(true);
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
    return (
      <div style={{ backgroundColor: '#141414', color: '#fff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px' }} dir="rtl">
        جاري تحميل تفاصيل الفيلم...
      </div>
    );
  }

  if (!movie) {
    return (
      <div style={{ backgroundColor: '#141414', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }} dir="rtl">
        <h2>عذراً، الفيلم المطلوب غير موجود أو لم يتم تحديده.</h2>
        <Link href="/" style={{ backgroundColor: '#E50914', color: '#fff', padding: '10px 20px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}>
          العودة للرئيسية
        </Link>
      </div>
    );
  }

  const currentVideoUrl = activeServer === 'server1' ? movie.video_url : (movie.server2_url || movie.video_url);

  return (
    <div dir="rtl" style={{ backgroundColor: '#141414', color: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif', margin: 0, paddingBottom: '50px' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', background: 'rgba(0,0,0,0.9)', position: 'sticky', top: 0, zIndex: 1000 }}>
        <h1 style={{ color: '#E50914', fontSize: '26px', fontWeight: '900', margin: 0, cursor: 'pointer' }}>FLEXI</h1>
        <Link href="/" style={{ color: '#fff', textDecoration: 'none', backgroundColor: '#333', padding: '8px 16px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold' }}>
          ← العودة للرئيسية
        </Link>
      </nav>

      <div style={{ maxWidth: '1000px', margin: '30px auto', padding: '0 20px' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', backgroundColor: '#000', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.8)' }}>
          <video 
            key={currentVideoUrl}
            controls 
            autoPlay 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            src={currentVideoUrl}
          >
            متصفحك لا يدعم عرض الفيديو.
          </video>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginTop: '20px', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', color: '#aaa' }}>سيرفرات المشاهدة:</span>
          <button 
            onClick={() => setActiveServer('server1')}
            style={{ backgroundColor: activeServer === 'server1' ? '#E50914' : '#333', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            السيرفر الأساسي (HD)
          </button>
          {movie.server2_url && (
            <button 
              onClick={() => setActiveServer('server2')}
              style={{ backgroundColor: activeServer === 'server2' ? '#E50914' : '#333', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              السيرفر الاحتياطي
            </button>
          )}
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 10px 0' }}>{movie.title}</h2>
          <div style={{ display: 'flex', gap: '15px', color: '#aaa', fontSize: '14px', marginBottom: '15px' }}>
            <span>سنة الإنتاج: {movie.year}</span>
            <span>الدولة: {movie.country}</span>
            <span style={{ color: '#f5c518', fontWeight: 'bold' }}>★ التقييم: {movie.rating}</span>
            <span style={{ backgroundColor: '#222', padding: '2px 8px', borderRadius: '4px', color: '#fff' }}>{movie.category}</span>
          </div>
          <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#ddd', margin: 0 }}>
            {movie.description}
          </p>
        </div>
      </div>
    </div>
  );
}
