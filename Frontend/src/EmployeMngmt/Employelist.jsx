import React, { useEffect, useState } from "react";
import axios from "axios";

const FetchData = () => {
  const [employees, setEmployees] = useState([]); // to store data from DB
  const [editedEmployee, setEditedEmployee] = useState(null);
  const [editedBonus, setEditedBonus] = useState("");
  const [editedPunishment, setEditedPunishment] = useState("");
  const [editedFirstname, setEditedFirstname] = useState("");
  const [editedMiddlename, setEditedmiddlename] = useState("");
  const [editedLastname, setEditedLastname] = useState("");
  const [editedemail, setEditedemail] = useState("");
  const [editedRole, setEditedRole] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [terminate, setTerminate] = useState(false);
  // Fetch data from database on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getEmploye");
        setEmployees(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployees();
  }, []); // Added an empty dependency array to ensure it runs once

  const handleEdit = (employee) => {
    setEditedEmployee(employee);
    setEditedPunishment(employee.punishment || "");
    setEditedBonus(employee.bonus || "");
    setEditedFirstname(employee.Firstname || "");
    setEditedmiddlename(employee.middlename || "");
    setEditedLastname(employee.Lastname || "");
    setEditedemail(employee.email || "");
    setEditedPhone(employee.PhoneNumber || "");
    setEditedRole(employee.Role || "");
  };
  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:4000/update/${editedEmployee._id}`, {
        punishment: editedPunishment,
        bonus: editedBonus,
        Firstname: editedFirstname,
        middlename: editedMiddlename,
        Lastname: editedLastname,
        email: editedemail,
        PhoneNumber: editedPhone,
        Role: editedRole,
      });
      alert("Employee updated successfully!");
      const response = await axios.get("http://localhost:4000/getEmploye");
      setEmployees(response.data);
      setEditedEmployee(null);
    } catch (error) {
      if ((error.response.status = 400)) {
        alert("Email already exists ");
        console.log("here in front end email is exist man ");
      }
      console.log("Error updating employee:", error);
    }
  };

  const handleDelete = async (id) => {
    const shouldTerminate = true;
    if (!shouldTerminate) {
      return;
    }
    try {
      setEmployees(employees.filter((x) => x._id !== id));
      await axios.delete(`http://localhost:4000/remove/${id}`);
      setTerminate(true);
      // alert("Employee terminated successfully!");
    } catch (error) {
      console.log("Error deleting employee:", error);
    }
  };
  setTimeout(() => {
    setTerminate(false);
  }, 20000);
  return (
    <>
      <div className="mt-34 px-6 mx-auto font-semibold mb-10 text-center">
        Here below is All our Employees
      </div>
      <div className="overflow-x-auto font-sans">
        <table className="table-auto border-collapse border border-gray-800 w-full text-sm md:text-base sm:text-justify sm:text-sm sm:overflow-x-auto md:overflow-x-auto">
          <thead>
            <tr className="bg-gray-200 font-medium">
              <th className="border border-gray-800 px-4 py-2 hidden sm:table-cell">
                Seq. No
              </th>
              <th className="border border-gray-800 px-4 py-2">First Name</th>
              <th className="border border-gray-800 px-4 py-2">Middle Name</th>
              <th className="border border-gray-800 px-4 py-2">Last Name</th>
              <th className="border border-gray-800 px-4 py-2">Role</th>
              <th className="border border-gray-800 px-4 py-2">Email</th>
              <th className="border border-gray-800 px-4 py-2">Phone Number</th>
              <th className="border border-gray-800 px-4 py-2">Bonus</th>
              <th className="border border-gray-800 px-4 py-2">Punishment</th>
              <th className="border border-gray-800 px-4 py-2">Edit</th>
              <th className="border border-gray-800 px-4 py-2">Terminate</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee._id} className="bg-gray-100">
                <td className="border border-gray-800 px-4 py-2 hidden sm:table-cell">
                  {index + 1}
                </td>
                <td className="border border-gray-800 px-4 py-2">
                  {editedEmployee === employee ? (
                    <input
                      type="text"
                      value={editedFirstname}
                      className="outline-none bg-gray-300"
                      onChange={(e) => setEditedFirstname(e.target.value)}
                      maxLength={15}
                    />
                  ) : (
                    employee.Firstname
                  )}
                </td>
                <td className="border border-gray-800 px-4 py-2">
                  {editedEmployee === employee ? (
                    <input
                      type="text"
                      value={editedMiddlename}
                      className="outline-none bg-gray-300"
                      onChange={(e) => setEditedmiddlename(e.target.value)}
                      maxLength={15}
                    />
                  ) : (
                    employee.middlename
                  )}
                </td>
                <td className="border border-gray-800 px-4 py-2">
                  {editedEmployee === employee ? (
                    <input
                      type="text"
                      value={editedLastname}
                      className="outline-none bg-gray-300"
                      onChange={(e) => setEditedLastname(e.target.value)}
                      maxLength={15}
                    />
                  ) : (
                    employee.Lastname
                  )}
                </td>
                <td className="border border-gray-800 px-4 py-2">
                  {editedEmployee === employee ? (
                    <input
                      type="text"
                      value={editedRole}
                      className="outline-none bg-gray-300"
                      onChange={(e) => setEditedRole(e.target.value)}
                      maxLength={10}
                    />
                  ) : (
                    employee.Role
                  )}
                </td>
                <td className="border border-gray-800 px-4 py-2">
                  {editedEmployee === employee ? (
                    <input
                      type="text"
                      value={editedemail}
                      className="outline-none bg-gray-300"
                      onChange={(e) => setEditedemail(e.target.value)}
                    />
                  ) : (
                    employee.email
                  )}
                </td>
                <td className="border border-gray-800 px-4 py-2">
                  {editedEmployee === employee ? (
                    <input
                      type="text"
                      value={editedPhone}
                      className="outline-none bg-gray-300"
                      onChange={(e) => setEditedPhone(e.target.value)}
                      maxLength={10}
                    />
                  ) : (
                    employee.PhoneNumber
                  )}
                </td>
                <td className="border border-gray-800 px-4 py-2">
                  {editedEmployee === employee ? (
                    <input
                      type="text"
                      value={editedBonus}
                      className="outline-none bg-gray-300"
                      onChange={(e) => setEditedBonus(e.target.value)}
                    />
                  ) : (
                    employee.bonus
                  )}
                </td>
                <td className="border border-gray-800 px-4 py-2">
                  {editedEmployee === employee ? (
                    <input
                      type="text"
                      value={editedPunishment}
                      className="outline-none bg-gray-300"
                      onChange={(e) => setEditedPunishment(e.target.value)}
                    />
                  ) : (
                    employee.punishment
                  )}
                </td>
                <td className="border border-gray-800 px-4 py-2">
                  {editedEmployee === employee ? (
                    <div>
                      <button
                        onClick={handleSave}
                        className="bg-gray-300 hover:bg-gray-700 text-white font-bold py-2 px-4 mb-2 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditedEmployee(null)}
                        className="bg-gray-300 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(employee)}
                      className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td className="border border-gray-800 px-4 py-2">
                  <button
                    onClick={() => handleDelete(employee._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Terminate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mx-20 text-center text-2xl text-teal-400">
          {terminate && <p>Employe terminated successffuly</p>}
        </div>
      </div>
    </>
  );
};

export default FetchData;
