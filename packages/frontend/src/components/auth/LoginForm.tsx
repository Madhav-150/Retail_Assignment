import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { FiMail, FiLock } from 'react-icons/fi';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, currentUser, error: authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const toastShownRef = React.useRef(false);

  // Handle redirects and messages
  useEffect(() => {
    // Redirect if already logged in
    if (currentUser) {
      navigate(from, { replace: true });
      return;
    }

    // Show success message if redirected from signup
    const message = location.state?.message;
    if (message && !toastShownRef.current) {
      setFormError('');
      toast.success(message);
      toastShownRef.current = true;
      // Clear the message from state
      window.history.replaceState({}, document.title);
    }

    // Show auth error if any
    if (authError) {
      setFormError(authError);
    }
  }, [currentUser, navigate, location, authError, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setFormError('');

    // Basic validation
    if (!email || !password) {
      setFormError('Please fill in all fields');
      return;
    }

    try {
      setIsSubmitting(true);

      await login(email, password);
      // No need to navigate here - the useEffect will handle it

    } catch (err: any) {
      // Use the error message from the caught error
      setFormError(err.message || 'Failed to sign in. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Welcome Back</h1>
          <p className="text-xl text-gray-500">Sign in to your account to continue</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-12 backdrop-blur-sm">
          {formError && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-base flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
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
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FiLock className="h-5 w-5 text-gray-500" />
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
                  Forgot password?
                </Link>
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
            </div>

            <div className="max-w-sm mx-auto mt-6 flex items-center justify-between gap-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer select-none">
                  Remember me
                </label>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 flex justify-center py-2.5 px-6 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white transform transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                  }`}
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          {/* Removed social login buttons for cleaner UI */}

          <div className="mt-8 text-center text-base">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
