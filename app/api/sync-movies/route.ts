import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://puqvjdrqefzhqavhryso.supabase.co";
const SUPABASE_KEY = "sb_publishable_WHA1Rx2KQStqfIfy0j5vtw__0ra0pl_"; 
const TMDB_API_KEY = "e547e17d4e91f3e62a571655cd1ccaff";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function GET() {
  try {
    // جلب الأفلام الشائعة من TMDB (مع دعم العربية)
    const tmdbRes = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=ar-AR&page=1`);
    const data = await tmdbRes.json();
    const movies = data.results || [];

    let addedCount = 0;

    for (const item of movies) {
      const movie_id_tmdb = item.id;
      const title = item.title || item.original_title;
      const description = item.overview || "لا توجد قصة متوفرة حالياً.";
      const release_date = item.release_date || "2026";
      const year = release_date.split("-")[0];
      const rating = item.vote_average || 7.0;
      const poster_path = item.poster_path;
      const image = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : "";
      
      // روابط التشغيل الذكية المباشرة
      const video_url = `https://vidsrc.xyz/embed/movie?tmdb=${movie_id_tmdb}`;
      const server2_url = `https://embed.su/embed/movie/${movie_id_tmdb}`;

      // إدخال البيانات إلى قاعدة بيانات Supabase
      const { error } = await supabase.from("movies").insert([
        {
          title,
          description,
          year,
          country: "عالمي",
          rating,
          category: "أكشن",
          image,
          video_url,
          server2_url
        }
      ]);

      if (!error) {
        addedCount++;
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `تم إطلاق الموسوعة بنجاح! تمت إضافة ${addedCount} فيلم إلى قاعدة البيانات.` 
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
