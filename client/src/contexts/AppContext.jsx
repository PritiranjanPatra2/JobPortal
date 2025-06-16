import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";


axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKENDURL;

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState([]);

  useEffect(() => {
    checkUserAuth();
    checkAdminAuth();
  }, []);

  const checkUserAuth = async () => {
    try {
      const res = await axios.get("/api/user/is-auth");
      if (res.data.success) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  const checkAdminAuth = async () => {
    try {
      const res = await axios.get("/api/admin/is-auth");
      if (res.data.success) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    } catch {
      setAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (name, email, password) => {
    try {
      const res = await axios.post("/api/user/register", { name, email, password });
      if (res.data.success) {
        toast.success(res.data.message);
        setUser(res.data.user);
       
        setShowUserLogin(false);
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error("Registration failed");
    }
  };

  const loginUser = async (email, password) => {
    try {
      const res = await axios.post("/api/user/login", { email, password });
      if (res.data.success) {
        toast.success(res.data.message);
        setUser(res.data.user);
        setShowUserLogin(false);
      } else {
        toast.error(res.data.message);
        navigate("/login");
      }
    } catch {
      toast.error("Login failed");
      navigate("/login");
    }
  };

  const logoutUser = async () => {
    try {
      const res = await axios.get("/api/user/logout");
      if (res.data.success) {
        setUser(null);
        
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error("Logout failed");
    }
  };

  const loginAdmin = async (email, password) => {
    try {
      const res = await axios.post("/api/admin/login", { email, password });
      if (res.data.success) {
        setAdmin(true);
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error("Admin login failed");
    }
  };

  const logoutAdmin = async () => {
    try {
      const res = await axios.get("/api/admin/logout");
      if (res.data.success) {
        setAdmin(false);
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error("Admin logout failed");
    }
  };
  const fetchJobs = async () => {
    try {
        const res = await axios.get('/api/jobs');
        if (!res.data.success) {
            toast.error(res.data.message);
            return;
        }else{
            // toast.success(res.data.message);
            setJobs(res.data.jobs); 
        }
   
    } catch (error) {
        console.error("Failed to fetch jobs:", error);
        // toast.error("Failed to load jobs");
        
    }
  };
  useEffect(() => {
  
  fetchJobs();
}, [user]);


  const value = {
    user,
    setUser,
    admin,
    setAdmin,
    showUserLogin,
    setShowUserLogin,
    axios,
    navigate,
    toast,
    loading,
    registerUser,
    loginUser,
    logoutUser,
    loginAdmin,
    logoutAdmin,
    jobs,
    setJobs,
    fetchJobs
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
