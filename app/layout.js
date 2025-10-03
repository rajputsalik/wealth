import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Wealth",
  description: "One stop solution for all your financial needs",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
     <html lang="en">
      <head>
          <link rel="icon" href="/logo-sm.png" sizes="any" />
        </head>
      <body className={`${inter.className}`}>
        {/* {header} */}
        <Header />  
        <main className="min-h-screen">   {/* {sidebar} */}
        {children}
          </main>

          <Toaster richColors />
    
     {/* {footer} */}

     <footer className="w-full border-t bg-background/50 text-center py-12">
       <div className="container mx-auto  items-center px-4 text-gray-600">
         <p className="text-sm text-muted-foreground"> &copy; 2025 Wealth. All rights reserved. </p>
          <p className="text-sm text-muted-foreground">Made with ❤️ by Mohd Salik</p>
       </div>
      </footer>
      </body>
    </html>
    </ClerkProvider>
  );
}
