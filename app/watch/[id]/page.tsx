import React from 'react';
import { supabase } from '../../../lib/supabase';

interface WatchPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ];
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { id } = params;

  return (
    <main className="min-h-screen p-8 bg-black text-white" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">مشاهدة العرض رقم: {id}</h1>
        
        <div className="w-full aspect-video bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700 mb-6">
          <p className="text-gray-400">مشغل الفيديو جاهز</p>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
          تفاصيل العرض والتفاعل تعمل بصورة سليمة.
        </div>
      </div>
    </main>
  );
}
