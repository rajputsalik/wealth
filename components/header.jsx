import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
    await checkUser();
  return (
       <div className="fixed top-0 w-full bg-white/50 backdrop-blur-md border-b z-50 ">
      
       <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/">
        <Image src={"/logo.png"} alt="Logo" width={150} height={50} className="cursor-pointer h-12 w-auto object-contain"/>
        </Link>




<div className="flex items-center space-x-4">

    <SignedIn>
        <Link href={"/dashboard"} className="text-gray-700 hover:text-gray-900 flex items-center gap-2 mr-4">
          <Button variant="outline cursor-pointer ">
            <LayoutDashboard size={18} />
            <span className="hidden md:inline cursor-pointer">Dashboard</span>
          </Button>
        </Link>

     <Link href={"/transaction/create"} className="text-gray-700 hover:text-gray-900 flex items-center gap-2 mr-4">
          <Button className="cursor-pointer">
            <PenBox size={18} />
            <span className="hidden md:inline cursor-pointer">Add Transaction</span>
          </Button>
        </Link>

    </SignedIn>

        <SignedOut>
             <SignInButton forceRedirectUrl="/dashboard">
            <Button variant="outline" className="cursor-pointer">Login</Button>
            </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
            </SignedIn>
       </div>
       </nav>
        </div>
  );
};

export default Header;
