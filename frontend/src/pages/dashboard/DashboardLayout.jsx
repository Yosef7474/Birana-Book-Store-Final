import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { HiViewGridAdd } from 'react-icons/hi';
import { MdOutlineManageHistory, MdShoppingCart } from 'react-icons/md'; 
import { io } from "socket.io-client";
import Notification from "./orders/Notification";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/admin");
  };


  useEffect(() => {
    const socket = io("http://localhost:5000"); // Replace with your backend URL

    socket.on("new-order", (data) => {
      console.log("New order notification:", data);
      alert(`Notification: ${data.message}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <StyledWrapper>
       <Notification /> {/* Add Notification Component */}
      <section className="flex md:bg-gray-900 text-gray-300 min-h-screen overflow-hidden">
        <aside className="hidden sm:flex sm:flex-col">
          <div onClick={handleLogout}>
            <button>Logout</button>
          </div>
          <div className="flex-grow flex flex-col justify-between bg-gray-800 text-gray-400">
            <nav className="flex flex-col mx-4 my-6 space-y-4">
              <Link to="/dashboard" className="inline-flex items-center justify-center py-3 text-gray-900 bg-gray-200 rounded-lg">
                <span className="sr-only">Dashboard</span>
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </Link>

              <Link to="/dashboard/orders" className="inline-flex items-center justify-center py-3 hover:text-gray-300 hover:bg-gray-700 focus:text-gray-300 focus:bg-gray-700 rounded-lg">
                <MdShoppingCart className="h-6 w-6" />
                <span className="ml-2">Orders</span>
              </Link>

              <Link to="/dashboard/add-new-book" className="inline-flex items-center justify-center py-3 hover:text-gray-300 hover:bg-gray-700 focus:text-gray-300 focus:bg-gray-700 rounded-lg">
                <HiViewGridAdd className="h-6 w-6" />
                <span className="ml-2">Add New Book</span>
              </Link>

              <Link to="/dashboard/manage-books" className="inline-flex items-center justify-center py-3 hover:text-gray-300 hover:bg-gray-700 focus:text-gray-300 focus:bg-gray-700 rounded-lg">
                <MdOutlineManageHistory className="h-6 w-6" />
                <span className="ml-2">Manage Books</span>
              </Link>
            </nav>
            <div className="inline-flex items-center justify-center h-20 w-20 border-t border-gray-700">
              <button className="p-3 hover:text-gray-300 hover:bg-gray-700 focus:text-gray-300 focus:bg-gray-700 rounded-lg" onClick={handleLogout}>
                <span className="sr-only">Logout</span>
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 4a2 2 0 011 3.732V9a2 2 0 012 2h3m0 0l-3-3m3 3H9a2 2 0 00-2 2v2.268A2 2 0 0110 16h9a2 2 0 002-2V8a2 2 0 00-2-2h-9a2 2 0 01-2 2v2.268A2 2 0 0110 10h9a2 2 0 002-2V5m0 0l3 3m-3-3l-3 3" />
                </svg>
              </button>
            </div>
          </div>
        </aside>

        <div className="flex-grow">
          <header className="flex items-center h-20 px-6 sm:px-10 bg-gray-800 text-gray-300">
            <button className="block sm:hidden p-2 text-gray-400 hover:text-gray-300 focus:text-gray-300 hover:bg-gray-700 focus:bg-gray-700 rounded-full">
              <span className="sr-only">Menu</span>
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </button>
            <div className="relative w-full max-w-md sm:-ml-2">
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="absolute h-6 w-6 mt-2.5 ml-2 text-gray-500">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <input type="text" role="search" placeholder="Search..." className="py-2 pl-10 pr-4 w-full bg-gray-900 placeholder-gray-500 focus:bg-gray-800 border border-gray-700 rounded-lg" />
            </div>
          </header>
          <main className="p-6 sm:p-10 space-y-6 bg-gray-900">
            <div className="text-white">
              <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
              <h2 className="text-gray-400">Book Store Inventory</h2>

              <div className="flex flex-col md:flex-row items-start justify-end -mb-3">
                <Link to="/dashboard/manage-books">
                  <StyledButton>
                    <strong>Manage Book</strong>
                  </StyledButton>
                </Link>

                <Link to="/dashboard/add-new-book">
                  <StyledButton>
                    <strong>Add Book</strong>
                  </StyledButton>
                </Link>
              </div>
            </div>
            <Outlet />
          </main>
        </div>
      </section>
    </StyledWrapper>
  );
};

// Styled components
const StyledWrapper = styled.div`
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 13rem;
    height: 3rem;
    background-size: 300% 300%;
    cursor: pointer;
    backdrop-filter: blur(1rem);
    border-radius: 5rem;
    margin: 10px;
    transition: 0.5s;
    animation: gradient_301 5s ease infinite;
    border: double 4px transparent;
    background-image: linear-gradient(#212121, #212121),
      linear-gradient(
        137.48deg,
        #ffdb3b 10%,
        #fe53bb 45%,
        #8f51ea 67%,
        #0044ff 87%
      );
    background-origin: border-box;
    background-clip: content-box, border-box;
  }

  #container-stars {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: 0.5s;
    backdrop-filter: blur(1rem);
    border-radius: 5rem;
  }

  strong {
    z-index: 2;
    font-family: "Avalors Personal Use";
    font-size: 12px;
    letter-spacing: 5px;
    color: #ffffff;
    text-shadow: 0 0 4px white;
  }

  #glow {
    position: absolute;
    display: flex;
    width: 12rem;
  }

  .circle {
    width: 100%;
    height: 30px;
    filter: blur(2rem);
    animation: pulse_3011 4s infinite;
    z-index: -1;
  }

  .circle:nth-of-type(1) {
    background: rgba(254, 83, 186, 0.636);
  }

  .circle:nth-of-type(2) {
    background: rgba(142, 81, 234, 0.704);
  }

  .btn:hover #container-stars {
    z-index: 1;
    background-color: #212121;
  }

  .btn:hover {
    transform: scale(1.1);
  }

  .btn:active {
    border: double 4px #fe53bb;
    background-origin: border-box;
    background-clip: content-box, border-box;
    animation: none;
  }

  .btn:active .circle {
    background: #fe53bb;
  }

  #stars {
    position: relative;
    background: transparent;
    width: 200rem;
    height: 200rem;
  }

  #stars::after {
    content: "";
    position: absolute;
    top: -10rem;
    left: -100rem;
    width: 100%;
    height: 100%;
    animation: animStarRotate 90s linear infinite;
  }

  #stars::after {
    background-image: radial-gradient(#ffffff 1px, transparent 1%);
    background-size: 50px 50px;
  }

  @keyframes animStarRotate {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0);
    }
  }

  @keyframes gradient_301 {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes pulse_3011 {
    0% {
      transform: scale(0.75);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }
    100% {
      transform: scale(0.75);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }
`;

// StyledButton definition
const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 13rem;
  height: 3rem;
  background-size: 300% 300%;
  cursor: pointer;
  backdrop-filter: blur(1rem);
  border-radius: 5rem;
  margin: 10px;
  transition: 0.5s;
  animation: gradient_301 5s ease infinite;
  border: double 4px transparent;
  background-image: linear-gradient(#212121, #212121),
    linear-gradient(
      137.48deg,
      #ffdb3b 10%,
      #fe53bb 45%,
      #8f51ea 67%,
      #0044ff 87%
    );
  background-origin: border-box;
  background-clip: content-box, border-box;

  strong {
    z-index: 2;
    font-family: "Avalors Personal Use";
    font-size: 12px;
    letter-spacing: 5px;
    color: #ffffff;
    text-shadow: 0 0 4px white;
  }

  @keyframes gradient_301 {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export default DashboardLayout;
