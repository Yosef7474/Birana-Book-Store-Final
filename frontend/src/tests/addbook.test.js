import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { AuthContext } from "../context/AuthContext";
import AddBook from "../components/Admin/Books/AddBook"; // Adjust the path accordingly

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

  /** AddBook Component Tests */
  test("AddBook renders all fields and submits correctly", async () => {
    renderWithProviders(<AddBook />);

    // Check if all fields are rendered
    expect(screen.getByLabelText(/Book Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Old Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/New Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cover Image/i)).toBeInTheDocument();

    // Simulate input values
    fireEvent.change(screen.getByLabelText(/Book Title/i), { target: { value: "Test Book" } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: "A test description" } });
    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: "fiction" } });
    fireEvent.change(screen.getByLabelText(/Old Price/i), { target: { value: "50" } });
    fireEvent.change(screen.getByLabelText(/New Price/i), { target: { value: "30" } });

    // Simulate file upload
    const file = new File(["dummy content"], "test-cover.jpg", { type: "image/jpeg" });
    const fileInput = screen.getByLabelText(/Cover Image/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Verify file selection
    expect(screen.getByText(/Selected: test-cover.jpg/i)).toBeInTheDocument();

    // Simulate form submission
    const submitButton = screen.getByRole("button", { name: /Add Book/i });
    fireEvent.click(submitButton);

    // Verify loading state
    expect(submitButton).toHaveTextContent(/Adding/i);

    // Mock successful response
    await waitFor(() => {
      expect(screen.getByText(/Book added successfully/i)).toBeInTheDocument();
    });
  });
});
