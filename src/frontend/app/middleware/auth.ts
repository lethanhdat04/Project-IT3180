'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getToken } from '../utils/auth';

export default function useAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
    }
  }, []);
}