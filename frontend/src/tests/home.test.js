import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Home from "../components/Home/Home"; // Adjust path as needed
import { AuthContext } from "../context/AuthContext";

// Mock Redux store
const mockStore = configureStore([]);

describe("All Components Tests", () => {
  const mockUser = {
    email: "testuser@example.com",
  };

  const renderWithProviders = (ui, store = mockStore({}), user = mockUser) => {
    return render(
      <Provider store={store}>
        <AuthContext.Provider value={{ user }}>
          <Router>{ui}</Router>
        </AuthContext.Provider>
      </Provider>
    );
  };

  /** Home Component Tests */
  test("Home renders child components correctly", () => {
    renderWithProviders(<Home />);

    // Check if child components are rendered
    expect(screen.getByTestId("banner")).toBeInTheDocument(); // Assuming Banner has a `data-testid="banner"`
    expect(screen.getByTestId("feature")).toBeInTheDocument(); // Assuming Feature has a `data-testid="feature"`
    expect(screen.getByTestId("top-sellers")).toBeInTheDocument(); // Assuming TopSellers has a `data-testid="top-sellers"`
    expect(screen.getByTestId("recommended")).toBeInTheDocument(); // Assuming Recommended has a `data-testid="recommended"`
  });

  // Additional tests for child components can go here
  test("Feature renders correctly within Home", () => {
    renderWithProviders(<Home />);

    expect(screen.getByText("Featured Section Title")).toBeInTheDocument(); // Replace with actual text from Feature component
  });

  test("TopSellers section appears", () => {
    renderWithProviders(<Home />);

    expect(screen.getByText("Top Sellers")).toBeInTheDocument(); // Replace with actual text from TopSellers
  });

  test("Recommended section appears", () => {
    renderWithProviders(<Home />);

    expect(screen.getByText("Recommended for You")).toBeInTheDocument(); // Replace with actual text from Recommended
  });
});
