import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

const MainLayout = ({ children }) => {
   return (
    <ClerkProvider>
      <div className="container mx-auto my-32">{children}</div>;
    </ClerkProvider>
  );
};

export default MainLayout;