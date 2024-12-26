import { supabase } from '../utils/supabaseClient';

export default function LogoutButton() {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Logout failed', error);
    else alert('Logged out successfully!');
  };

  return <button onClick={handleLogout}>Logout</button>;
}
