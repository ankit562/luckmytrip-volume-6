
import { ArrowRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authUserSlice';
import toast from 'react-hot-toast'

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector(state => state.auth);

  // Redirect if user is already logged in (only when component mounts)
  useEffect(() => {
   
    if (user && user.role) {
      const role = user.role.toLowerCase();
     
      if (role === 'client') {
        
        navigate('/', { replace: true });
      } else if (['admin', 'superadmin', 'content-creator'].includes(role)) {
       
        navigate('/dashboard', { replace: true });
      }
    }
  }, [user, navigate]);




  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((userData) => {
        
        setEmail('');
        setPassword('');
        
        // Handle redirection after successful login
        const role = userData.role?.toLowerCase();
        if (role === 'client') {
          navigate('/', { replace: true });
        } else if (['admin', 'superadmin', 'content-creator'].includes(role)) {
          navigate('/dashboard', { replace: true });
        }
      })
      .catch((err) => {
        console.error('Login error:', err);
        toast.error(err.message || 'Login failed');
      });
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg px-8 py-10 md:mt-40 mt-12">
      <div className="text-center mb-8">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <span className="text-blue-600 font-bold text-xl">🔐</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-gray-600 mt-2">Login to your Account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-sm md:text-base px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border text-sm md:text-base border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Login...' : 'LogIn'}
        </button>
      </form>

      <p className='mt-8 text-center text-sm text-gray-400'>
        Not a member?{" "}
        <Link to='/signup' className='font-medium text-blue-400 hover:text-blue-500'>
          Sign up now <ArrowRight className='inline h-4 w-4' />
        </Link>
      </p>
      <p className='mt-1 text-center text-sm text-gray-400'>
        go back to{" "}
        <Link to='/' className='font-medium text-blue-400 hover:text-blue-500'>
          homepage <ArrowRight className='inline h-4 w-4 ' />
        </Link>
      </p>


    </div>
  );
};
export default LoginPage;
