import React from "react";
import FeatureAssistants from "./_components/FeatureAssistants";

function Dashboard() {
  return (
    <div>
      <FeatureAssistants />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20"></div>
    </div>
  );
}

export default Dashboard;
