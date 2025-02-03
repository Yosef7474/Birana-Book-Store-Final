import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import BookCard from "../BookCard";
import { AuthContext } from "../../../context/AuthContext";

// Mock Redux store and API call
const mockStore = configureStore([]);
jest.mock("../../../redux/features/books/booksApi", () => ({
  useAddRatingMutation: () => [
    jest.fn().mockResolvedValue({ data: "Success" }), // Mock mutation
    { isLoading: false, isSuccess: false, error: null },
  ],
}));

describe("BookCard Component", () => {
  const mockBook = {
    _id: "1",
    title: "Test Book",
    description: "This is a test book description.",
    coverImage: "test-image.jpg",
    newPrice: 200,
    oldPrice: 300,
    averageRating: 4.5,
  };

  const mockUser = {
    email: "testuser@example.com",
  };

  const renderComponent = (book, user) => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <AuthContext.Provider value={{ user }}>
          <Router>
            <BookCard book={book} />
          </Router>
        </AuthContext.Provider>
      </Provider>
    );
  };

  test("renders book details correctly", () => {
    renderComponent(mockBook, mockUser);

    expect(screen.getByText("Test Book")).toBeInTheDocument();

    expect(screen.getByText("This is a test book description.")).toBeInTheDocument();

    expect(screen.getByText("Br 200")).toBeInTheDocument();
    expect(screen.getByText("Br 300")).toBeInTheDocument();

    expect(screen.getByText("(4.5)")).toBeInTheDocument();
  });

  test("handles add to cart button click", () => {
    renderComponent(mockBook, mockUser);

    const addToCartButton = screen.getByText("Add to Cart");
    fireEvent.click(addToCartButton);

    expect(addToCartButton).toBeInTheDocument();
  });

  test("renders stars for user rating and handles rating submission", async () => {
    renderComponent(mockBook, mockUser);

    const stars = screen.getAllByRole("img");
    expect(stars).toHaveLength(5);

    fireEvent.click(stars[3]); 

    expect(screen.getByText("Submitting...")).toBeInTheDocument();
  });

  test("displays error when no user email is provided", () => {
    renderComponent(mockBook, null); 

   
    const stars = screen.getAllByRole("img");

    fireEvent.click(stars[3]); 


    expect(screen.getByText("User email is not available.")).toBeInTheDocument();
  });

  test("navigates to book details page when clicked", () => {
    renderComponent(mockBook, mockUser);

    const titleLink = screen.getByText("Test Book");
    fireEvent.click(titleLink);

    expect(titleLink.closest("a")).toHaveAttribute("href", "/books/1");
  });
});
