import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const InvalidCredentials = () => {
  // Inline styles
  const containerStyle = {
    position: "fixed", // Use fixed to cover the entire screen
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#f0f0f0", // Assuming skeleton has a light background
    zIndex: 1, // Ensure this is below the panel
  };

  const panelStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    zIndex: 2, // Ensure this is above the skeleton
  };

  return (
    <div style={containerStyle}>
      {/* Skeleton background */}
      <Skeleton height="100vh" /> {/* Full viewport height */}
      {/* Foreground panel with message */}
      <div style={panelStyle}>
        <p className="text-lg font-bold text-center">Admin Access Denied</p>
        <p className="text-sm text-center mt-2">
          You do not have the necessary credentials to access this area.
        </p>
      </div>
    </div>
  );
};

export default InvalidCredentials;
