import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      
      //not want to authonticated
      const publicRoutes = ['/login', '/register'];
      const isPublicRoute = publicRoutes.includes(location.pathname);
      
      // protected routes
      if (!user && !isPublicRoute) {
        navigate('/login', { state: { from: location } });
      }
      
      //after authonticated user try login and register page access
      if (user && isPublicRoute) {
        navigate(location.state?.from || '/', { replace: true });
      }
    });

    return unsubscribe;
  }, [navigate, location]);

  const value = {
    currentUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}