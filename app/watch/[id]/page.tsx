import React from 'react';
import WatchClient from './WatchClient';

// السماح بالمسارات الديناميكية التي لم يتم توليدها مسبقاً أثناء البناء
export const dynamicParams = true;

// دالة فارغة أو توريد عناصر أساسية لتجاوز فحص البناء الثابت
export async function generateStaticParams() {
  return [
    { id: '1' }
  ];
}

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  return <WatchClient id={params.id} />;
}
