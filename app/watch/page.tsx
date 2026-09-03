'use client';
import React, { Suspense } from 'react';
import WatchClient from './WatchClient'; // الملفات أصبحت معه في نفس المجلد

export default function Page() {
  return (
    <Suspense fallback={<div style={{ color: '#fff', textAlign: 'center', padding: '50px' }}>جاري التحميل...</div>}>
      <WatchClient />
    </Suspense>
  );
}
