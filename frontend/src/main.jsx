import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { RouterProvider } from 'react-router-dom';
import router from './routers/routers.jsx';
import 'sweetalert2/dist/sweetalert2.js';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      {/* Wrap the entire app with RouterProvider */}
      <RouterProvider router={router} />
      
      {/* Add the ToastContainer at the root of your app */}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // Switch to "dark" if you want a dark mode
        icon={false}  // Default icon setup; customize in slices for specific icons
      />
    </StrictMode>
  </Provider>
);
