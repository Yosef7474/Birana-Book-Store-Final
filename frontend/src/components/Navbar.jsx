import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext"; // Adjust path if necessary
import avatarImg from "../assets/avatar.png";
import logoImg from "../assets/logo.jpg";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Get user from context
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigation = [
    { name: "Profile", href: "/Profile" },
    { name: "CheckoutPage", href: "/api/orders/orderPage" },
    { name: "orders", href: "/viewOrders" },
    { name: "Cart Page", href: "/CartPage" },
  ];

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <header className="mx-auto px-4 py-6 bg-gray-700">
      <nav className="flex justify-between items-center">
        {/* Left side */}
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/">
            <img src={logoImg} alt="Logo" className="size-12 rounded-full" />
          </Link>
          {/* Search Input */}
          <form onSubmit={handleSearch} className="relative sm:w-72 w-40 space-x-2">
            <FaSearch className="absolute inline-block left-3 inset-y-2" />
            <input
              type="text"
              placeholder="Search here"
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-[#EAEAED] w-full py-1 md:px-6 rounded-md focus:outline-none"
            />
          </form>
        </div>

        {/* Right side */}
        <div className="relative flex items-center md:space-x-3 space-x-2">
          <div>
            {user ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatarImg}
                    alt="User Avatar"
                    className="size-7 rounded-full ring-2 ring-blue-500"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                          <Link to={item.href} className="block px-4 py-2 text-sm hover:bg-gray-100">
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
                <span className="ml-2 text-white font-medium">{user.name}</span>
              </>
            ) : (
              <Link to="/api/users/login">
                <button className="text-gray-300 hover:text-white">Login</button>
              </Link>
            )}
          </div>

          <Link
            to="/CartPage"
            className="bg-primary rounded-[10px] p-1 sm:px-6 py-2 flex items-center"
          >
            <FaCartPlus className="size-6" />
            {cartItems.length > 0 ? (
              <span className="text-sm font-semibold sm:ml-1">{cartItems.length}</span>
            ) : (
              <span className="text-sm font-semibold sm:ml-1">0</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
