'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { getGoogleAuthUrl } from '@/lib/api/auth';
import { Loader2, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const { login, isLoading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLoading = isSubmitting || authLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(''); setIsSubmitting(true);
    try { await login({ email, password }); }
    catch (err) { setError(err instanceof Error ? err.message : 'Invalid email or password'); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      <div className="auth-image-panel hidden h-full w-2/5 md:block"><img className="h-full w-full object-fill" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png" alt="A calm workspace" /></div>
      <div className="auth-form-panel flex h-full w-full items-center justify-center px-6 py-12 sm:px-12 md:w-3/5">
        <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col">
          <h2 className="text-center text-4xl font-medium text-gray-900">Sign in</h2>
          <p className="mt-3 text-center text-sm text-gray-500">Welcome back! Please sign in to continue</p>
          {error && <div className="mt-6 rounded-lg bg-error-light p-3 text-sm text-error-dark">{error}</div>}
          <div className="mt-8 flex h-12 items-center gap-3 overflow-hidden rounded-full border border-gray-300/70 pl-5 focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-gray-800/10"><Mail className="h-4 w-4 text-gray-500" /><input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} className="h-full w-full bg-transparent pr-5 text-sm text-gray-700 outline-none placeholder:text-gray-400" /></div>
          <div className="mt-6 flex h-12 items-center gap-3 overflow-hidden rounded-full border border-gray-300/70 pl-5 focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-gray-800/10"><Lock className="h-4 w-4 text-gray-500" /><input id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading} className="h-full w-full bg-transparent pr-5 text-sm text-gray-700 outline-none placeholder:text-gray-400" /></div>
          <div className="mt-5 flex justify-end"><Link href="/forgot-password" className="text-sm text-gray-500 underline-offset-2 hover:text-gray-800 hover:underline">Forgot password?</Link></div>
          <button type="submit" className="mt-7 h-11 w-full rounded-full bg-gray-800 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60" disabled={isLoading}>{isLoading ? <><Loader2 className="mr-2 inline h-4 w-4 animate-spin" />Signing in...</> : 'Sign in'}</button>
          <div className="my-7 flex items-center gap-3 text-sm text-gray-500"><div className="h-px flex-1 bg-gray-200" /><span className="whitespace-nowrap">Or continue with</span><div className="h-px flex-1 bg-gray-200" /></div>
          <button type="button" className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-gray-200 text-sm text-gray-800 shadow-sm transition hover:bg-gray-50 disabled:opacity-60" onClick={() => { window.location.href = getGoogleAuthUrl(); }} disabled={isLoading}><span className="text-lg font-bold">G</span>Continue with Google</button>
          <p className="mt-7 text-center text-sm text-gray-500">Don&apos;t have an account? <Link href="/register" className="font-medium text-gray-800 hover:underline">Sign up</Link></p>
        </form>
      </div>
    </div>
  );
}