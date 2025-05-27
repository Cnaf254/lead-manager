"use client"
import Link from "next/link"
import Image from "next/image"




function NavBar() {

  

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      {/* Header Section */}
      <div className="flex justify-between items-center px-10 py-3">
        <div className="flex gap-20 w-[50%] items-center">
          <Link href="/">
          Lead Manager
          </Link>

          {/* Desktop Links */}
          <div className="hidden sm:flex space-x-8">
            <Link href="/">Home</Link>
            <Link href="/">Leads</Link>
          </div>
        </div>

        

        {/* Search and Cart */}
        <div className="flex space-x-8 items-center">
          
          
          <Image
            src="/user.png"
            width={30}
            height={30}
            alt="user"
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* Mobile Menu Links - Only show search when hamburger is clicked */}
      
    </div>
  );
}

export default NavBar;