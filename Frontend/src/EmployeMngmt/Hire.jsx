import axios from "axios";
import React, { useState } from "react";

export default function Hire() {
  const [message, setMessage] = useState(false);
  const [formData, setFormData] = useState({
    Firstname: "",
    middlename: "",
    Lastname: "",
    Role: "",
    birthdates: "",
    email: "",
    PhoneNumber: "",
    startdate: "",
    address: "",
  });
  const handleForm = async (e) => {
    e.preventDefault(); // this is just used to prevent default forms submission forms
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:4000/registerEmploye",
        formData
      );
      alert("successffuly registered Guys !! ");
    } catch (error) {
      if (error.response && error.response.status == 400) {
        alert("Email already exists !!");
        setMessage(true);
      }
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-4 rounded-lg shadow-md mb-20">
        <h2 className="text-3xl font-bold text-center mb-8">
          Add new employee
        </h2>
        <form onSubmit={handleForm}>
          <div className="flex justify-between mb-4">
            <div className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Firstname"
              >
                First Name
              </label>
              <input
                id="Firstname"
                type="text"
                value={formData.Firstname}
                onChange={(e) =>
                  setFormData((prev) => {
                    return { ...formData, Firstname: e.target.value };
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter first name"
                required
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 mx-2"
                htmlFor="middlename"
              >
                Middle name
              </label>
              <input
                id="middlename"
                type="text"
                value={formData.middlename}
                onChange={(e) =>
                  setFormData(() => {
                    return { ...formData, middlename: e.target.value };
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-2"
                placeholder="Enter your middle name"
                required
              />
            </div>
          </div>
          <div className="flex justify-between mb-4">
            <div className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Lastname"
              >
                last name
              </label>
              <input
                id="Lastname"
                type="text"
                value={formData.Lastname}
                onChange={(e) =>
                  setFormData(() => {
                    return { ...formData, Lastname: e.target.value };
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your Last name"
                required
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 mx-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData(() => {
                    return { ...formData, email: e.target.value };
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter email"
                required
              />
            </div>
          </div>
          <div className="flex justify-between mb-4">
            <div className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Phone Number
              </label>
              <input
                id="text"
                type="text"
                value={formData.PhoneNumber}
                onChange={(e) =>
                  setFormData(() => {
                    return { ...formData, PhoneNumber: e.target.value };
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter phone number"
                maxLength={10}
                required
              />
            </div>
            <div className="mb-2 px-5">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 px-2"
                htmlFor="Lastname"
              >
                Birth day
              </label>
              <input
                id="birthdates"
                type="date"
                value={formData.birthdates}
                onChange={(e) =>
                  setFormData(() => {
                    return { ...formData, birthdates: e.target.value };
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your Last name"
                required
              />
            </div>
          </div>
          <div className="flex justify-between mb-4">
            <div className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="startdate"
              >
                starting dates
              </label>
              <input
                id="startdate"
                type="date"
                value={formData.startdate}
                onChange={(e) =>
                  setFormData(() => {
                    return { ...formData, startdate: e.target.value };
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-2">
              {" "}
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Role"
              >
                Position
              </label>
              <select
                id="Role"
                value={FormData.Role}
                onChange={(e) =>
                  setFormData(() => {
                    return { ...formData, Role: e.target.value };
                  })
                }
                className="shadow appearance-none border rounded w-full px-20 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value=""></option>
                <option value="receptionist">Receptionist</option>
                <option value="doctor">Doctor</option>
                <option value="waiters">Waiter</option>
              </select>
            </div>
          </div>
          <div className="mb-2">
            <div className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                id="text"
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData(() => {
                    return { ...formData, address: e.target.value };
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter address"
                maxLength={20}
                required
              />
            </div>
          </div>
          <button
            id="submission"
            type="submit"
            className="bg-blue-500 text-white py-4  rounded hover:bg-red-600 px-20 mx-12"
          >
            Hire Employee
          </button>
        </form>
      </div>
    </div>
  );
}
