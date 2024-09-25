import React from "react";

function LoadingProgress() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-8 h-8 bg-black rounded-full animate-ping"></div>
    </div>
  );
}

export default LoadingProgress;