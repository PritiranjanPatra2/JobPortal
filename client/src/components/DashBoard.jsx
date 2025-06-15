import React, { useEffect, useState } from 'react';
import { useAppContext } from '../contexts/AppContext';

function DashBoard() {
  const { navigate, jobs, setJobs } = useAppContext();
  const [statusFilter, setStatusFilter] = useState('All');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    let filtered = statusFilter === 'All' ? jobs : jobs.filter((job) => job.status === statusFilter);

    const sorted = [...filtered].sort((a, b) =>
      sortOrder === 'asc'
        ? new Date(a.appliedDate) - new Date(b.appliedDate)
        : new Date(b.appliedDate) - new Date(a.appliedDate)
    );

    setFilteredJobs(sorted);
  }, [jobs, statusFilter, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
  };

  return (
    <div className="px-4 md:px-16 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Your Job Applications</h1>

        <div className="flex flex-wrap gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border rounded bg-white cursor-pointer hover:bg-gray-300"
          >
            <option value="All">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
            <option value="Accepted">Accepted</option>
          </select>

          <button
            className="px-4 py-2 bg-white text-black rounded border hover:bg-gray-300 cursor-pointer"
            onClick={toggleSortOrder}
          >
            Sort by Applied Date ({sortOrder === 'asc' ? 'Oldest First' : 'Newest First'})
          </button>

          <button
            className="px-4 py-2 bg-white border text-black rounded hover:bg-gray-300"
            onClick={() => navigate('/add-job')}
          >
             Add Job Application
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse rounded-md shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Company</th>
              <th className="p-3 border">Role</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Applied Date</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job) => (
              <tr key={job._id} className="hover:bg-gray-50">
                <td className="p-3 border">{job.company}</td>
                <td className="p-3 border text-blue-600">{job.role}</td>
                <td className="p-3 border">
                  <span className="px-2 py-1 bg-gray-200 rounded text-sm">{job.status}</span>
                </td>
                <td className="p-3 border">
                  {new Date(job.appliedDate).toISOString().split('T')[0]}
                </td>
                <td
                  className="p-3 border text-blue-600 cursor-pointer hover:underline"
                  onClick={() => navigate(`/job/${job._id}`)}
                >
                  View Details
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredJobs.length === 0 && (
          <p className="text-center mt-4 text-gray-600">No job applications found.</p>
        )}
      </div>
    </div>
  );
}

export default DashBoard;
