import React, { useEffect, useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

function AdminDashBoard() {
  const [jobs, setJobs] = useState([]);
  const { axios } = useAppContext();
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`/api/admin/getAll`);
      if (res.data.success) {
        setJobs(res.data.jobs);
      }
    } catch (error) {
      console.error('Error fetching admin jobs:', error.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
  };

  const handleLogout = async () => {
    try {
      await axios.get('/api/admin/logout');
      navigate('/admin-login');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  const filteredAndSortedJobs = jobs
    .filter((job) => (statusFilter === '' ? true : job.status === statusFilter))
    .sort((a, b) =>
      sortOrder === 'asc'
        ? new Date(a.appliedDate) - new Date(b.appliedDate)
        : new Date(b.appliedDate) - new Date(a.appliedDate)
    );

  return (
    <div className="px-4 md:px-16 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold"> Welcome to Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-100 text-black px-4 py-2 rounded hover:bg-red-400"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label>Status Filter:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-3 py-1 rounded"
          >
            <option value="">All</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
            <option value="Accepted">Accepted</option>
          </select>
        </div>

        <button
          onClick={handleSortToggle}
          className=" text-black px-4 py-2 rounded hover:bg-gray-100 border-1 cursor-pointer"
        >
          Sort by Applied Date ({sortOrder === 'asc' ? 'Oldest First' : 'Newest First'})
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">User</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Company</th>
              <th className="p-3 border">Role</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Applied Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedJobs.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-600">
                  No job applications found
                </td>
              </tr>
            ) : (
              filteredAndSortedJobs.map((job) => (
                <tr key={job._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{job.user?.name || '-'}</td>
                  <td className="p-3 border">{job.user?.email || '-'}</td>
                  <td className="p-3 border">{job.company}</td>
                  <td className="p-3 border text-gray-600">{job.role}</td>
                  <td className="p-3 border">
                    <span className="px-2 py-1 bg-gray-200 rounded text-sm">{job.status}</span>
                  </td>
                  <td className="p-3 border">
                    {new Date(job.appliedDate).toISOString().split('T')[0]}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashBoard;
