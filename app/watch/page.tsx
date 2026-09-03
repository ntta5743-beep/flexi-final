'use client';

import React, { Suspense } from 'react';
import WatchClient from './WatchClient';

export default function WatchPage() {
  return (
    <Suspense fallback={
      <div style={{ backgroundColor: '#141414', color: '#fff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px' }} dir="rtl">
        جاري تحميل تفاصيل الفيلم ومشغل العرض...
      </div>
    }>
      <WatchClient />
    </Suspense>
  );
}
