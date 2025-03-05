import React from "react";
import WatchlistWidget from "../../components/Trading/WatchlistWidget";
import PositionSummary from "./components/PositionSummary";

const Dashboard: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        <WatchlistWidget />
        <PositionSummary />
      </div>
    </div>
  );
};

export default Dashboard;
