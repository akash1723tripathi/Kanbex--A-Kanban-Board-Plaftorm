'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { getGoogleAuthUrl } from '@/lib/api/auth';
import { Loader2, Mail, Lock, User } from 'lucide-react';

export default function RegisterPage() {
  const { register, isLoading: authLoading } = useAuth();
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); const [isSubmitting, setIsSubmitting] = useState(false); const isLoading = isSubmitting || authLoading;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    if (password !== confirmPassword) { setError('Passwords do not match'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters'); return; }
    setIsSubmitting(true);
    try { await register({ email, password, name }); } catch (err) { setError(err instanceof Error ? (err.message.includes('exists') ? 'An account with this email already exists' : err.message) : 'Something went wrong. Please try again.'); } finally { setIsSubmitting(false); }
  };
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      <div className="auth-image-panel hidden h-full w-2/5 md:block"><img className="h-full w-full object-fill" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png" alt="A calm workspace" /></div>
      <div className="auth-form-panel flex h-full w-full items-center justify-center overflow-y-auto px-6 py-10 sm:px-12 md:w-3/5">
        <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col">
          <h2 className="text-center text-4xl font-medium text-gray-900">Create account</h2><p className="mt-3 text-center text-sm text-gray-500">Get started with Kanbex today</p>
          {error && <div className="mt-6 rounded-lg bg-error-light p-3 text-sm text-error-dark">{error}</div>}
          <div className="mt-7 flex h-12 items-center gap-3 overflow-hidden rounded-full border border-gray-300/70 pl-5 focus-within:ring-2 focus-within:ring-gray-800/10"><User className="h-4 w-4 text-gray-500" /><input id="name" type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required disabled={isLoading} className="h-full w-full bg-transparent pr-5 text-sm outline-none placeholder:text-gray-400" /></div>
          <div className="mt-4 flex h-12 items-center gap-3 overflow-hidden rounded-full border border-gray-300/70 pl-5 focus-within:ring-2 focus-within:ring-gray-800/10"><Mail className="h-4 w-4 text-gray-500" /><input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} className="h-full w-full bg-transparent pr-5 text-sm outline-none placeholder:text-gray-400" /></div>
          <div className="mt-4 flex h-12 items-center gap-3 overflow-hidden rounded-full border border-gray-300/70 pl-5 focus-within:ring-2 focus-within:ring-gray-800/10"><Lock className="h-4 w-4 text-gray-500" /><input id="password" type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading} className="h-full w-full bg-transparent pr-5 text-sm outline-none placeholder:text-gray-400" /></div>
          <div className="mt-4 flex h-12 items-center gap-3 overflow-hidden rounded-full border border-gray-300/70 pl-5 focus-within:ring-2 focus-within:ring-gray-800/10"><Lock className="h-4 w-4 text-gray-500" /><input id="confirmPassword" type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required disabled={isLoading} className="h-full w-full bg-transparent pr-5 text-sm outline-none placeholder:text-gray-400" /></div>
          <p className="mt-2 text-xs text-gray-500">Use at least 8 characters with uppercase, lowercase, and number.</p>
          <button type="submit" className="mt-6 h-11 w-full rounded-full bg-gray-800 text-sm font-medium text-white transition hover:bg-gray-700 disabled:opacity-60" disabled={isLoading}>{isLoading ? <><Loader2 className="mr-2 inline h-4 w-4 animate-spin" />Creating account...</> : 'Create account'}</button>
          <div className="my-6 flex items-center gap-3 text-sm text-gray-500"><div className="h-px flex-1 bg-gray-200" /><span className="whitespace-nowrap">Or continue with</span><div className="h-px flex-1 bg-gray-200" /></div>
          <button type="button" className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-gray-200 text-sm text-gray-800 shadow-sm transition hover:bg-gray-50 disabled:opacity-60" onClick={() => { window.location.href = getGoogleAuthUrl(); }} disabled={isLoading}><span className="text-lg font-bold">G</span>Continue with Google</button>
          <p className="mt-6 text-center text-sm text-gray-500">Already have an account? <Link href="/login" className="font-medium text-gray-800 hover:underline">Sign in</Link></p>
        </form>
      </div>
    </div>
  );
}