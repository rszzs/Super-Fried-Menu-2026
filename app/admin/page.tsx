'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/?admin=true');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] text-[#283618]">
      <div className="text-sm font-medium animate-pulse">جاري التحويل للوحة الإدارة...</div>
    </div>
  );
}
