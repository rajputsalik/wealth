import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
    await checkUser();
  return (
       <div className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-50 shadow-sm">
      
       <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <Image src={"/logo.png"} alt="Logo" width={150} height={50} className="cursor-pointer h-12 w-auto object-contain"/>
        </Link>




<div className="flex items-center space-x-3">

    <SignedIn>
        <Link href={"/dashboard"} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center gap-2">
          <Button variant="outline" className="cursor-pointer border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
            <LayoutDashboard size={18} />
            <span className="hidden md:inline">Dashboard</span>
          </Button>
        </Link>

     <Link href={"/transaction/create"} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center gap-2">
          <Button className="cursor-pointer bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:opacity-90 transition-opacity text-white border-0">
            <PenBox size={18} />
            <span className="hidden md:inline">Add Transaction</span>
          </Button>
        </Link>

    </SignedIn>

        <SignedOut>
             <SignInButton forceRedirectUrl="/dashboard">
            <Button variant="outline" className="cursor-pointer border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">Login</Button>
            </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton 
                appearance={{ 
                  elements: { 
                    avatarBox: "w-10 h-10",
                    userButtonPopoverCard: "shadow-xl border border-gray-200 dark:border-gray-700",
                    userButtonPopoverActions: "bg-white dark:bg-gray-800",
                    userButtonPopoverActionButton: "hover:bg-gray-50 dark:hover:bg-gray-700"
                  } 
                }} 
              />
            </SignedIn>
       </div>
       </nav>
        </div>
  );
};

export default Header;
