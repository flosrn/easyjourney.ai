import React from "react";

const LoadingDots = () => {
  return (
    <div className="flex space-x-2">
      <div className="h-2 w-2 animate-bounce rounded-full bg-current"></div>
      <div className="h-2 w-2 animate-bounce rounded-full bg-current delay-150"></div>
      <div className="h-2 w-2 animate-bounce rounded-full bg-current delay-300"></div>
    </div>
  );
};

export default LoadingDots;
