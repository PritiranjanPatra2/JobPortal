import React, { useEffect, useState } from 'react';
import { useAppContext } from '../contexts/AppContext';

function Login() {
    const {registerUser,loginUser,navigate,user}=useAppContext();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleToggle = () => {
    setIsSignup((prev) => !prev);
    setFormData({ name: '', email: '', password: '' });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      registerUser(formData.name, formData.email, formData.password);
    } else {
      loginUser(formData.email, formData.password);
      navigate('/dashboard');
      
    }

  };
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  },[user])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-black-600">
          {isSignup ? 'Applicant Signup' : 'Applicant Login'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 border text-black rounded hover:bg-gray-100 cursor-pointer transition"
          >
            {isSignup ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <button
            type="button"
            onClick={handleToggle}
            className="text-blue-600 ml-1 hover:underline"
          >
            {isSignup ? 'Login' : 'Signup'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
