import React, { useState } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import CustomButton from '../components/ui/Button';

const LOGIN_IMAGE_URL = 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80';

// Helper function to determine dashboard path based on user role
const getDashboardPath = (role) => {
  switch (role?.toLowerCase()) {
    case 'admin':
      return '/admin/overview';
    case 'patient':
      return '/app/patient/dashboard';
    case 'doctor':
      return '/app/doctor/dashboard';
    case 'pharmacy':
      return '/app/pharmacy/dashboard';
    case 'labcenter': // Corresponds to LAB_STAFF in App.jsx roles
      return '/app/labcenter/dashboard';
    case 'emergency': // Corresponds to EMERGENCY_DOCTOR in App.jsx roles
    case 'emergency_doctor':
      return '/app/emergency/dashboard';
    default:
      return '/'; // Fallback to home or a generic dashboard
  }
};

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorRequired, setTwoFactorRequired] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? '' : 'Please enter a valid email address';
  };

  const validatePassword = (value) => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters long';
    return '';
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const err = validatePassword(value);
    setPasswordError(err);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setGeneralError('');
    if (twoFactorRequired && !twoFactorCode) {
      setGeneralError('Please enter your 2FA code.');
      return;
    }
    const eErr = validateEmail(email);
    const pErr = validatePassword(password);
    setEmailError(eErr);
    setPasswordError(pErr);
    
    if (!eErr && !pErr && email && password) {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, twoFactorCode }),
        });

        const data = await response.json();

        if (response.ok) {
          if (data.twoFactorRequired) {
            setTwoFactorRequired(true);
            setGeneralError(data.message);
          } else {
            console.log('Login successful:', data);
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userRole', data.role ? data.role.toUpperCase() : '');
            
            navigate(getDashboardPath(data.role));
          }
        } else {
          console.error('Login failed:', data);
          setGeneralError(data.message || 'Login failed. Please check your credentials.');
        }
      } catch (error) {
        console.error('Network or server error during login:', error);
        setGeneralError('Login failed due to a network or server error. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleDevLogin = (role) => {
    localStorage.setItem('authToken', 'dev-token');
    localStorage.setItem('userRole', role.toUpperCase());
    navigate(getDashboardPath(role));
  };

  return (
    <div className="fixed inset-0 bg-slate-900 w-full h-full overflow-auto">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img
          src={LOGIN_IMAGE_URL}
          alt="Healthcare professionals"
          className="h-full w-full object-cover opacity-60"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-800/60"></div>
      </div>

      {/* Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-3 bg-slate-900/90 backdrop-blur-sm">
        <Link to="/" className="flex items-center text-white">
          <span className="text-3xl mr-2" role="img" aria-label="medical">🏥</span>
          <span className="text-xl font-bold">MedRec</span>
        </Link>
        
        {/* Right-aligned action buttons */}
        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-white text-sm font-medium">
            <span className="hover:text-teal-300">LOGIN</span>
          </Link>
          <Link to="/signup" className="bg-white text-slate-900 hover:bg-gray-100 py-2 px-4 rounded-md text-sm font-medium">
            SIGN UP
          </Link>
        </div>
      </header>
      
      {/* Login Content Container */}
      <div className="relative z-10 flex flex-col justify-center items-start min-h-screen px-6 sm:px-12 lg:px-24 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-12">
          {/* Left Info Section */}
          <div className="flex flex-col justify-center text-white">
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome back to MedRec</h1>
              <p className="text-lg text-slate-200">
                Your secure portal for medical records management. Login to access your dashboard.
              </p>
            </div>
          </div>

          {/* Right Form Section - White Card */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-2xl">
            {/* Logo header - on mobile and desktop */}
            <div className="flex items-center mb-8">
              <span className="text-3xl mr-2" role="img" aria-label="medical">🏥</span>
              <h1 className="text-2xl font-bold text-teal-600 dark:text-teal-400">MedRec</h1>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Login to your account</h2>
            
            <form onSubmit={handleLogin} className="space-y-6 mb-6">
              {/* 2FA code input */}
              {twoFactorRequired && (
                <div>
                  <label htmlFor="twoFactorCode" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    2FA Code
                  </label>
                  <input
                    id="twoFactorCode"
                    name="twoFactorCode"
                    type="text"
                    value={twoFactorCode}
                    onChange={e => setTwoFactorCode(e.target.value)}
                    className="w-full px-3 py-2 border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
                    placeholder="Enter 2FA code"
                  />
                </div>
              )}
              {generalError && (
                <div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 dark:bg-red-900/30 dark:border-red-600 dark:text-red-400 rounded-md">
                  <p>{generalError}</p>
                </div>
              )}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full px-3 py-2 border ${ 
                    emailError ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                  } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500`}
                  placeholder="your.email@example.com"
                />
                {emailError && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{emailError}</p>}
              </div>

              <div>
                <div className="flex justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Password
                  </label>
                  <a href="#" className="text-sm text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300">
                    Forgot password?
                  </a>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  className={`w-full px-3 py-2 border ${ 
                    passwordError ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                  } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500`}
                  placeholder="••••••••"
                />
                {passwordError && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{passwordError}</p>}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-teal-500 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
              </div>

              {/* Google login button */}
              <div className="mt-4">
                <a href="/oauth2/authorization/google" className="w-full inline-flex justify-center items-center border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Sign in with Google
                </a>
              </div>
            </form>

            <div className="text-left">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300">
                  Sign up
                </Link>
              </p>
            </div>

            {/* Development Login Section */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 text-center mb-4">For Development Only</h3>
              <div className="grid grid-cols-2 gap-2 mx-auto">
                <button
                  onClick={() => handleDevLogin('patient')}
                  className="text-xs py-2 px-2 border border-slate-300 dark:border-slate-600 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-center"
                >
                  Patient Dashboard
                </button>
                <button
                  onClick={() => handleDevLogin('doctor')}
                  className="text-xs py-2 px-2 border border-slate-300 dark:border-slate-600 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-center"
                >
                  Doctor Dashboard
                </button>
                <button
                  onClick={() => handleDevLogin('pharmacy')}
                  className="text-xs py-2 px-2 border border-slate-300 dark:border-slate-600 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-center"
                >
                  Pharmacy Dashboard
                </button>
                <button
                  onClick={() => handleDevLogin('admin')}
                  className="text-xs py-2 px-2 border border-slate-300 dark:border-slate-600 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-center"
                >
                  Admin Dashboard
                </button>
                <button
                  onClick={() => handleDevLogin('labcenter')}
                  className="text-xs py-2 px-2 border border-slate-300 dark:border-slate-600 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-center"
                >
                  Lab Center Dashboard
                </button>
                <button
                  onClick={() => handleDevLogin('emergency_doctor')}
                  className="text-xs py-2 px-2 border border-slate-300 dark:border-slate-600 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-center"
                >
                  ER Doctor Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage; 