import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import socket from "./socket";

const Notifications = () => {
  useEffect(() => {
    socket.on("orderPlaced", (data) => {
      toast.success(data.message);
    });

    return () => {
      socket.off("orderPlaced");
    };
  }, []);

  return <ToastContainer />;
};

export default Notifications;
