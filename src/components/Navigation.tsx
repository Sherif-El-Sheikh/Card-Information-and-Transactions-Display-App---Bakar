import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll to change navbar styles (check scroll position)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Remove the scroll event listener component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed w-full top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled?
        "bg-white bg-opacity-90 shadow-lg backdrop-blur-lg"
          :
          "bg-white shadow-sm"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex space-x-4 py-4">
        {/* Link for Issued Card */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "px-4 py-2 rounded-md transition-colors text-sm sm:text-base",
                isActive?
                "bg-gray-100 text-gray-900 cursor-default"
                  :
                  "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )
            }
          >
            Issued Cards
          </NavLink>

          {/* link for View Transactions */}
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              cn(
                "px-4 py-2 rounded-md transition-colors text-sm sm:text-base",
                isActive? 
                "bg-gray-100 text-gray-900 cursor-default"
                  :
                  "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )
            }
          >
            View Transactions
          </NavLink>
        </div>
      </div>
    </div>
  );
}
