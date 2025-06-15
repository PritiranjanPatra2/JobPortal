import React, { useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    title: 'Track Applications',
    description: 'Keep track of all your job applications in one organized place',
    icon: '💼',
    color: 'text-blue-500',
  },
  {
    title: 'Analytics & Insights',
    description: 'Get insights into your job search progress and success rates',
    icon: '📊',
    color: 'text-green-500',
  },
  {
    title: 'Real-time Notifications',
    description: 'Stay updated with real-time notifications about your applications',
    icon: '🔔',
    color: 'text-yellow-500',
  },
  {
    title: 'Team Management',
    description: 'Admin panel for recruiters and career counselors to help applicants',
    icon: '👥',
    color: 'text-purple-500',
  },
];

const Home = () => {
  const { user,navigate } = useAppContext();
  

  useEffect(() => {
    if (user) {
      navigate('/dashboard'); 
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e8efff] to-[#e8efff]/60 py-16 px-4 text-center">
    
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Job Application Tracker</h1>
        <p className="text-gray-600 text-lg mb-6">
          Take control of your job search. Track applications, manage interviews, and never miss an opportunity again.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/register')}
            className="bg-white text-black cursor-pointer px-6 py-2 rounded shadow hover:bg-gray-100 font-medium"
          >
            Get Started Free
          </button>
          <button
            onClick={() => navigate('/login')}
            className="cursor-pointer bg-black text-white px-6 py-2 rounded shadow hover:bg-gray-800 font-medium"
          >
            Sign In
          </button>
        </div>
      </div>

      <div className="mt-16 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-black text-white p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <div className={`text-4xl mb-3 ${feature.color}`}>{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-20 max-w-2xl mx-auto bg-black text-white rounded-lg p-8 shadow text-center">
        <h2 className="text-xl font-semibold mb-2">Ready to organize your job search?</h2>
        <p className="text-gray-300 mb-6">
          Join thousands of job seekers who have streamlined their application process
        </p>
        <button
          onClick={() => navigate('/register')}
          className="bg-white cur-p text-black px-6 py-2 rounded hover:bg-gray-100 transition font-medium"
        >
          Start Tracking Today
        </button>
      </div>
    </div>
  );
};

export default Home;
