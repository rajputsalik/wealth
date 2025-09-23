import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen justify-center items-center pt-40 ">
      {children}
    </div>
  );
};

export default AuthLayout;
