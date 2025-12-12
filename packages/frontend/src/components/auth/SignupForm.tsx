import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FiUser, FiMail, FiLock, FiCheck } from 'react-icons/fi';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate(from, { replace: true });
    }
  }, [currentUser, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setError('');

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    // Password complexity validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters and include uppercase, lowercase, number, and special character');
      return;
    }

    try {
      setIsSubmitting(true);

      // Call the signup function
      await signup(email, password, name);

      // If successful, redirect to login page
      navigate('/login', {
        state: {
          message: 'Account created successfully! Please log in.'
        }
      });

    } catch (err: any) {
      // Set the error message from the error object
      setError(err.message || 'Failed to create an account');
      console.error('Signup error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Create your account</h1>
          <p className="text-xl text-gray-500">Join us today and start your journey</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-12 backdrop-blur-sm">
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-base flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="max-w-sm mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <FiUser className="h-5 w-5 text-gray-500" />
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
              </div>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all duration-200 ease-in-out shadow-sm hover:bg-gray-100"
                placeholder="John Doe"
              />
            </div>

            <div className="max-w-sm mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <FiMail className="h-5 w-5 text-gray-500" />
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all duration-200 ease-in-out shadow-sm hover:bg-gray-100"
                placeholder="example@email.com"
              />
            </div>

            <div className="max-w-sm mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <FiLock className="h-5 w-5 text-gray-500" />
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all duration-200 ease-in-out shadow-sm hover:bg-gray-100"
                placeholder="••••••••"
              />
              <div className="mt-3 flex items-start">
                <FiCheck className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-gray-500">
                  Must be at least 8 characters with uppercase, lowercase, number & special char
                </p>
              </div>
            </div>

            <div className="max-w-sm mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <FiLock className="h-5 w-5 text-gray-500" />
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
              </div>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all duration-200 ease-in-out shadow-sm hover:bg-gray-100"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-start max-w-sm mx-auto">
              <div className="flex items-center h-6">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                />
              </div>
              <div className="ml-2 text-base">
                <label htmlFor="terms" className="font-medium text-gray-700 cursor-pointer">
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-500 underline decoration-blue-500/30 hover:decoration-blue-500 transition-all">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-500 underline decoration-blue-500/30 hover:decoration-blue-500 transition-all">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>

            <div className="max-w-sm mx-auto">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white transform transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                  }`}
              >
                {isSubmitting ? 'Creating account...' : 'Sign up'}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-base">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
