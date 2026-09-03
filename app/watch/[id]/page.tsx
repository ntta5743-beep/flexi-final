import React from 'react';
import WatchClient from './WatchClient';

export async function generateStaticParams() {
  // توليد مصفوفة الأيدي من 1 إلى 100 لجميع الأفلام
  return Array.from({ length: 100 }, (_, i) => ({
    id: (i + 1).toString()
  }));
}

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  return <WatchClient id={params.id} />;
}
