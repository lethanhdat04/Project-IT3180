'use client';
import useAuthRedirect from '../middleware/auth';

export default function AdminPage() {
  useAuthRedirect();
  return <h2 className="text-center mt-10 text-red-600">This is Admin Only Page</h2>;
}

