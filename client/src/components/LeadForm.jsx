import React, { useState, useEffect } from "react";
import axios from "axios";

const LeadForm = ({
  currentId,
  setCurrentId,
  refreshLeads,
  setLeadFormOpen,
}) => {
  const [leadData, setLeadData] = useState({
    name: "",
    email: "",
    number: "",
    productCategory: "A", // Default selection
  });

  useEffect(() => {
    if (currentId) {
      axios
        .get(`http://localhost:5000/leads/${currentId}`)
        .then(({ data }) => setLeadData(data))
        .catch((error) => console.error("Error fetching lead data:", error));
    } else {
      setLeadData({ name: "", email: "", number: "", productCategory: "A" });
    }
  }, [currentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentId) {
        await axios.put(`http://localhost:5000/leads/${currentId}`, leadData);
      } else {
        await axios.post("http://localhost:5000/leads", leadData);
      }
      refreshLeads();
      setLeadFormOpen(false);
      setCurrentId(null);
    } catch (error) {
      console.error("Error saving lead:", error);
      // Consider adding user feedback here
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-slate-600/70 backdrop-blur z-50">
      <div className="relative max-w-lg lg:w-[412px] mx-auto p-6 bg-white rounded-lg shadow-lg">
        <button
          onClick={() => setLeadFormOpen(false)}
          className="absolute top-3 right-3 text-slate-600 hover:text-red-600 text-xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {currentId ? "Edit Lead" : "Add New Lead"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={leadData.name}
              onChange={(e) =>
                setLeadData({ ...leadData, name: e.target.value })
              }
              placeholder="Enter Name"
              required
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email ID
            </label>
            <input
              id="email"
              type="email"
              value={leadData.email}
              onChange={(e) =>
                setLeadData({ ...leadData, email: e.target.value })
              }
              placeholder="Enter Email ID"
              required
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="number"
              className="block text-sm font-medium text-gray-700"
            >
              Number
            </label>
            <input
              id="number"
              type="text"
              value={leadData.number}
              onChange={(e) =>
                setLeadData({ ...leadData, number: e.target.value })
              }
              placeholder="Enter Number"
              required
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="productCategory"
              className="block text-sm font-medium text-gray-700"
            >
              Product Category
            </label>
            <select
              id="productCategory"
              value={leadData.productCategory}
              onChange={(e) =>
                setLeadData({ ...leadData, productCategory: e.target.value })
              }
              required
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="A">Product A</option>
              <option value="B">Product B</option>
              <option value="C">Product C</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            {currentId ? "Update Lead" : "Add Lead"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;
