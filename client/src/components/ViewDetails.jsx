import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

function ViewDetails() {
  const { axios, toast, fetchJobs } = useAppContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchJob = async () => {
    try {
      const res = await axios.get(`/api/jobs/${id}`);
      setJob(res.data);
    } catch (error) {
      toast.error('Failed to fetch job details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      const res = await axios.delete(`/api/jobs/${id}`);
      toast.success(res.data.message || 'Job deleted');
      await fetchJobs();
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to delete job');
    }
  };

  const handleEdit = () => {
    navigate(`/edit-job/${id}`);
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!job) return <div className="text-center py-10">Job not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-1">{job.role} at {job.company}</h1>
      <p className="text-sm text-blue-600 mb-6">
        Application submitted on {new Date(job.appliedDate).toLocaleDateString()}
      </p>

      <h2 className="font-semibold text-lg mb-2">Application Details</h2>
      <div className="border-t border-gray-200 divide-y">
        <DetailRow label="Company" value={job.company} />
        <DetailRow label="Job Title" value={job.role} />
        <DetailRow label="Application Date" value={new Date(job.appliedDate).toLocaleDateString()} />
        <DetailRow label="Status" value={job.status} />
        
        <DetailRow label="Notes" value={job.notes || '—'} />
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          Back to Dashboard
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="py-3 flex justify-between text-sm">
      <span className="font-medium text-gray-600">{label}</span>
      <span className="text-gray-800 text-right max-w-xs">{value}</span>
    </div>
  );
}

export default ViewDetails;
