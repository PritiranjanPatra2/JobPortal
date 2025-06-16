import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

function EditJob() {
  const { id } = useParams();
  const { axios, toast, fetchJobs } = useAppContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    appliedDate: "",
    notes: "",
  });

  const [loading, setLoading] = useState(true);

  const fetchJob = async () => {
    try {
      const res = await axios.get(`/api/jobs/${id}`);
      const { company, role, status, appliedDate, notes } = res.data;
      setFormData({
        company,
        role,
        status,
        appliedDate: appliedDate?.split("T")[0],
        notes,
      });
    } catch (error) {
      toast.error("Failed to fetch job");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/jobs/${id}`, formData);
      toast.success("Job updated successfully");
      await fetchJobs();
      navigate(`/job/${id}`);
    } catch (error) {
      toast.error("Something went wrong while updating job");
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center  gap-2 text-sm px-4 py-2 rounded text-gray-800 bg-gray-50 hover:border-1 cursor-pointer transition"
        >
          <span className="text-lg">←</span>
          <span>Return</span>
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-black-600">
          Edit Job Application
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
              <option value="Accepted">Accepted</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Applied Date</label>
            <input
              type="date"
              name="appliedDate"
              value={formData.appliedDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gray-200 cursor-pointer text-black rounded hover:bg-gray-500 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditJob;
