import { useRouter } from 'next/navigation';
import { supabase } from './supabaseClient';
import { useEffect, useState } from 'react';

export default function withAuth(Component) {
  return function AuthProtected(props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          // If no session, redirect to login
          router.push('/login?message=login_required');
        } else {
          setLoading(false);
        }
      };

      checkSession();
    }, [router]);

    if (loading) {
      return <p>Loading...</p>;
    }

    return <Component {...props} />;
  };
}
