import React from "react";
import Link from "next/link";
import MainNav from "./MainNav";
import StoreSwitcher from "./StoreSwitcher";

const Navbar = () => {
  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4 items-center">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              <Link
                href="/"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                <StoreSwitcher />
              </Link>

              <MainNav className="hover:text-white hover:bg-gray-700 px-3 py-2 " />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
