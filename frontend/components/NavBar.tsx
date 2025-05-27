"use client"
import Link from "next/link"
import { User } from "lucide-react";




function NavBar() {

  

  return (
    <div className="sticky top-0 z-50 bg-black shadow-md">
      {/* Header Section */}
      <div className="flex justify-between items-center px-10 py-3">
        <div className="flex gap-20 w-[50%] items-center ">
          <Link href="/" className="text-white">
          Lead Manager
          </Link>

          {/* Desktop Links */}
          <div className="hidden sm:flex space-x-8">
            <Link href="/" className="text-white">Home</Link>
            <Link href="/" className="text-white">Leads</Link>
          </div>
        </div>

        

        {/* Search and Cart */}
        <div className="flex space-x-8 items-center">
          
          
          

<User className="w-6 h-6 text-white cursor-pointer" />

        </div>
      </div>

      {/* Mobile Menu Links - Only show search when hamburger is clicked */}
      
    </div>
  );
}

export default NavBar;