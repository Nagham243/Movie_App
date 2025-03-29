import React from "react";

const NotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <img 
        src="src\assest\404-error-page-examples-best.webp" 
        alt="404 Not Found" 
        className="img-fluid" 
        style={{ maxWidth: "400px" }} 
      />
      <h4 className="text-danger mt-4">Oops! Page Not Found</h4>
      <p className="text-muted text-secondary">The page you're looking for doesn't exist.</p>
      <a href="/" className="btn btn-custom text-secondary bg-black mt-3">Go Home</a>
    </div>
  );
};

export default NotFound;
