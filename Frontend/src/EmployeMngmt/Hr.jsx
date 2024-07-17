import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Outlet, Link } from "react-router-dom";

const Hr = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const response = await axios.get("http://localhost:4000/hr", {
          withCredentials: true,
        });
      } catch (error) {
        if (error.response || error.response.status === 401) {
          navigate("/login");
        } else {
          alert("An error occurred");
        }
      }
    };
    checkAccess();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-cover bg-center">
      <nav className="bg-gray-800 p-4 fixed top-0 w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-semibold">
            Employe management pages
          </div>
          <div className="space-x-4">
            <Link to="/hr/home" className="text-gray-300 hover:text-white">
              Home
            </Link>
            <Link to="/hr/hire" className="text-gray-300 hover:text-white">
              Hire
            </Link>
            <Link
              to="/hr/employelist"
              className="text-gray-300 hover:text-white"
            >
              Employelist
            </Link>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Hr;
