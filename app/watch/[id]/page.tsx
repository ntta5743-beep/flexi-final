import React from 'react';
import WatchClient from './WatchClient';

// هذه الدالة تعمل على الخادم لتحديد الصفحات الثابتة المطلوبة
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' }
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
