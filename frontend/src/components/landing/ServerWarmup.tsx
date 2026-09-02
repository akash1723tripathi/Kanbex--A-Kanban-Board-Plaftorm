'use client';

import { useEffect } from 'react';

/** Wake the Render service as soon as the landing page is opened. */
export function ServerWarmup() {
  useEffect(() => {
    const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000').replace(/\/$/, '');

    void fetch(`${apiUrl}/health/live`, {
      method: 'GET',
      cache: 'no-store',
      credentials: 'omit',
      keepalive: true,
    }).catch(() => {
      // The warm-up request is best-effort and must not affect the landing page.
    });
  }, []);

  return null;
}