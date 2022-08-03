import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogOut() {
  const navigate = useNavigate();

  useEffect(() => {
    async function submitLogout() {
      const res = await fetch('/logout', { method: 'POST' });
      if (res.ok) {
        localStorage.removeItem('loggedIn');
      }
      navigate('/login');
    }

    submitLogout();
  }, [navigate]);

  return 'logout';
}
