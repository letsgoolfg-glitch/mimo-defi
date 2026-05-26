'use client';

import Navbar from '@/components/Navbar';
import { useWalletStore } from '@/store/useWalletStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AppGroupLayout({ children }: { children: React.ReactNode }) {
  const { isConnected } = useWalletStore();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) router.push('/');
  }, [isConnected, router]);

  if (!isConnected) return null;

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-mimo-dark">
        {children}
      </main>
    </>
  );
}
