import React, { useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const LeadItem = ({ lead, setCurrentId, refreshLeads, setLeadFormOpen }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(lead.name);
  const [email, setEmail] = useState(lead.email);
  const [number, setNumber] = useState(lead.number);
  const [product, setProduct] = useState(lead.product);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/leads/${lead._id}`);
      refreshLeads(); // Refresh leads after deletion
    } catch (error) {
      console.error("Error deleting lead:", error);
      // Consider adding user feedback here
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/leads/${lead._id}`, {
        name,
        email,
        number,
        product,
      });
      setIsEditing(false);
      refreshLeads(); // Refresh leads after saving
    } catch (error) {
      console.error("Error updating lead:", error);
      // Consider adding user feedback here
    }
  };

  return (
    <div className="p-4 relative bg-white flex flex-col sm:flex-row sm:justify-between rounded-lg shadow-md w-full mb-4">
      {isEditing ? (
        <div className="flex absolute z-20 bg-slate-50 w-[300px] md:flex-col p-3 border rounded-md sm:flex-row gap-1">
          <div className="flex flex-col">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-2 p-2 border border-gray-300 rounded"
              placeholder="Name"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-2 p-2 border border-gray-300 rounded"
              placeholder="Email"
            />
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="mb-2 p-2 border border-gray-300 rounded"
              placeholder="Number"
            />
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="mb-2 p-2 border border-gray-300 rounded"
            >
              <option value="A">Product A</option>
              <option value="B">Product B</option>
              <option value="C">Product C</option>
            </select>
          </div>
          <div className="flex space-x-2 mt-4 sm:mt-0 sm:self-start">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 border border-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              aria-label={`Save ${name}`}
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              aria-label={`Cancel editing ${name}`}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between w-full sm:flex-row gap-1">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-gray-600">{email}</p>
            <p className="text-gray-600">{number}</p>
            <p className="text-gray-600">{product}</p>
          </div>
          <div className="flex space-x-2 mt-4 sm:mt-0 sm:self-start">
            <button
              onClick={handleDelete}
              className="bg-white text-red-500 px-4 py-2 rounded-md hover:bg-red-50 border border-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              aria-label={`Delete ${name}`}
            >
              <FaTrash />
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-white text-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-50 border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              aria-label={`Edit ${name}`}
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadItem;
