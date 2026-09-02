'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Home } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [transitionState, setTransitionState] = useState<'entering' | 'exiting'>('entering');

  const goHome = () => {
    if (transitionState === 'exiting') return;
    setTransitionState('exiting');
    window.setTimeout(() => router.push('/'), 520);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-white">
      <button
        type="button"
        aria-label="Go to landing page"
        onClick={goHome}
        disabled={transitionState === 'exiting'}
        className="fixed left-6 top-6 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/70 bg-white/90 text-gray-700 shadow-sm backdrop-blur transition hover:bg-white hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:cursor-default"
      >
        <Home className="h-6 w-6" />
      </button>
      <main className={`auth-page h-full w-full ${transitionState === 'exiting' ? 'auth-page--exiting' : 'auth-page--entering'}`}>
        {children}
      </main>
    </div>
  );
}