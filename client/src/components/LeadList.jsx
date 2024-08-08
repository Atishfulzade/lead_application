import React, { useState, useEffect } from "react";
import axios from "axios";
import LeadItem from "./LeadItem";
import { FaSearch } from "react-icons/fa";

const LeadsList = ({ setCurrentId, setLeadFormOpen, setFetchLeads }) => {
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");

  const fetchLeads = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/leads");
      setLeads(data);
    } catch (error) {
      console.error("Error fetching leads:", error);
      // Consider adding user feedback here
    }
  };

  useEffect(() => {
    fetchLeads();
    setFetchLeads(() => fetchLeads); // Provide fetchLeads to parent
  }, [setFetchLeads]);

  const filteredLeads = leads
    .filter(
      (lead) =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      if (a[sortField] < b[sortField]) return -1;
      if (a[sortField] > b[sortField]) return 1;
      return 0;
    });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Welcome to Lead Application
        </h1>

        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button
            onClick={() => setLeadFormOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Add Lead
          </button>
          <div className="flex items-center text-gray-400 bg-white border rounded-md px-3 shadow-sm">
            <FaSearch size={18} />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 text-gray-700 bg-transparent outline-none sm:text-sm"
            />
          </div>
          <select
            onChange={(e) => setSortField(e.target.value)}
            className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
          >
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="number">Number</option>
            <option value="productCategory">Product</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredLeads.length ? (
          filteredLeads.map((lead) => (
            <LeadItem
              key={lead._id}
              lead={lead}
              setCurrentId={setCurrentId}
              refreshLeads={fetchLeads}
              setLeadFormOpen={setLeadFormOpen}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No leads available</p>
        )}
      </div>
    </div>
  );
};

export default LeadsList;
