'use client';
import useAuthRedirect from '..//middleware/auth';

export default function DashboardPage() {
  useAuthRedirect();
  return <h2 className="text-center mt-10">This is Dashboard (User Role)</h2>;
}
