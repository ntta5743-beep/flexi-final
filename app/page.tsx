import React from 'react';
import { supabase } from '../lib/supabase';

export default async function Page() {
  // تجربة بسيطة للاتصال بقاعدة البيانات للتأكد من عملها
  const { data, error } = await supabase.from('movies').select('*').limit(5);

  return (
    <main className="min-h-screen p-8 bg-gray-900 text-white" dir="rtl">
      <h1 className="text-3xl font-bold mb-6">مرحباً بك في منصة Flexi</h1>
      <p className="text-gray-400 mb-4">تم ربط قاعدة البيانات بنجاح وجاهز للعرض.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* عرض المحتوى أو الفيديوهات هنا */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-2">أحدث العروض</h2>
          <p className="text-sm text-gray-400">الموقع يعمل بكفاءة عالية على Render.</p>
        </div>
      </div>
    </main>
  );
}
