import { ArrowRight } from 'lucide-react';
import React, { useState, useEffect  } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../features/auth/authUserSlice';
import toast from 'react-hot-toast'

const SignupPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName , setFullName] = useState('')
  const [phone , setPhone] = useState('')

  const dispatch = useDispatch();
	const navigate = useNavigate();
  
	const { loading , error, user} = useSelector(state => state.auth);

  useEffect(() => {
    if (user) {  
      if (!user.isVerified) {
        navigate('/otp-verification');  
      } else {
        navigate('/dashboard'); 
      }
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);


  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!(fullName && email && phone && password)) {
    toast.error('Please fill all the fields');
    return;
  }
  try {
    const response = await dispatch(signupUser({ fullName, email, phone, password })).unwrap();
    const emailFromResponse = response.email;

    // Clear inputs only on success
    setFullName('');
    setEmail('');
    setPhone('');
    setPassword('');

    // redirect to OTP page and pass email (example)
    navigate('/otp-verification', { state: { email: emailFromResponse } });
  } catch (err) {
    console.error(err);
    toast.error(err.message || 'Signup failed');
  }
};

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8 mt-5">
      <div className="text-center mb-8">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <span className="text-blue-600 font-bold text-xl">🔐</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-gray-600 mt-2">Sign up to your Account</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="Fullname" className="block text-sm font-medium text-gray-700 mb-2">
            Fullname
          </label>
          <input
            id="Fullname"
            type="text"
            placeholder="Enter your Fullname"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3 py-2 border text-sm md:text-base border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

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
            className="w-full px-3 py-2 border text-sm md:text-base border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="Phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone no.
          </label>
          <input 
            id="Phone"
            type="text"
            placeholder="Enter your Phone no."
            value={phone}
            maxLength={10}
            
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border text-sm md:text-base border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

        {/* {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
            {error}
          </div>
        )} */}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Signing in...' : 'Sign Up'}
        </button>

      </form>
      <h3 className='text-center text-sm text-gray-400 mt-4 hover:text-blue-500 font-medium'><Link to={"/forgotpassword"}>forgot password ?</Link></h3>
      <p className='mt-1 text-center text-sm text-gray-400'>
        Already have an account?{" "}
        <Link to='/login' className='font-medium text-blue-400 hover:text-blue-500'>
          Login here <ArrowRight className='inline h-4 w-4 ' />
        </Link>
      </p>
      <p className='mt-1 text-center text-sm text-gray-400'>
        go back to {" "}
        <Link to='/' className='font-medium text-blue-400 hover:text-blue-500'>
          homepage <ArrowRight className='inline h-4 w-4 ' />
        </Link>
      </p>

    </div>
  );
};
export default SignupPage;
