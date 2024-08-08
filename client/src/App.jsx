import React, { useState } from "react";
import LeadForm from "./components/LeadForm";
import LeadsList from "./components/LeadList";

const App = () => {
  const [currentId, setCurrentId] = useState(null);
  const [leadFormOpen, setLeadFormOpen] = useState(false);
  const [fetchLeads, setFetchLeads] = useState(() => () => {}); // Store fetchLeads function

  return (
    <div>
      {leadFormOpen && (
        <LeadForm
          currentId={currentId}
          setCurrentId={setCurrentId}
          refreshLeads={fetchLeads}
          setLeadFormOpen={setLeadFormOpen}
        />
      )}
      <LeadsList
        setCurrentId={setCurrentId}
        setLeadFormOpen={setLeadFormOpen}
        setFetchLeads={setFetchLeads} // Pass setter to LeadsList
      />
    </div>
  );
};

export default App;
