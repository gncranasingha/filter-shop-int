import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { toast } from 'react-hot-toast';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      
      await createUserWithEmailAndPassword(auth, email, password);
      
      
      await signOut(auth);
      
      toast.success('Account created successfully! Please login.');
      navigate('/login', { 
        state: { 
          fromRegistration: true,
          registeredEmail: email 
        } 
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Your Account</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength="6"
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
            />
          </div>
            
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2563eb] hover:bg-[#1e40af] text-white font-medium py-2 px-4 rounded transition-colors duration-300 disabled:opacity-70"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-[#2563eb] hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}


