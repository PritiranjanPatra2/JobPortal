import React, { useState } from "react";
import { useAppContext } from "../contexts/AppContext";

function Navbar() {
  const { navigate, user, setUser, logoutUser } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white shadow px-4 py-3 md:px-16 flex items-center justify-between relative">
      <div
        className="text-2xl font-bold text-black-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        JobNest
      </div>


      <div className="hidden sm:flex gap-4 items-center">
       

        {user ? (
          <>
             <span className="text-sm font-medium text-gray-700">
              Welcome, {user.name || 'Applicant'}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-red-100 text-black border-1 cursor-pointer rounded hover:bg-red-400 transition"
            >
              Logout
            </button>
          </>
        ) : (
            <>
             <button
          onClick={() => navigate("/admin-dashboard")}
          className="px-4 py-2 text-sm bg-gray-800 text-white cursor-pointer rounded hover:bg-gray-700 transition"
        >
          Admin
        </button>
          <button
            onClick={() => navigate("/login")}  
            className="px-4 py-2 text-sm border text-black rounded hover:bg-gray-500 cursor-pointer transition"
          >
            Applicant Login
          </button></>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="sm:hidden flex items-center px-3 py-2 border rounded text-gray-700 border-gray-400"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>

      {isOpen && (
        <div className="sm:hidden absolute top-[60px] right-4 bg-white border border-gray-200 rounded shadow-md z-50 w-48 py-2">
          

          {user ? (
            <>
              <span className="block px-4 py-2 text-sm text-gray-700">
                Welcome, {user.name || "Applicant"}
              </span>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
           <> <button
            onClick={() => {
              setIsOpen(false);
              navigate("/admin-dashboard");
            }}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Admin
          </button>
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/login");
              }}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              Applicant Login
            </button></>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
