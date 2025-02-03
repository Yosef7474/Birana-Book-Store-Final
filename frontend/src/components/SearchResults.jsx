import React from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchBooksQuery } from "../redux/features/books/booksApi";


const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query"); // Get search query from URL
  const { data: books, isLoading, error } = useSearchBooksQuery(query, {
    skip: !query, // Skip query if no search term
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching books</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Search Results for "{query}"</h1>
      {books?.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book.id} className="mb-2">
              <h2 className="font-semibold">{book.name}</h2>
              <p>{book.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books found.</p>
      )}
    </div>
  );
};

export default SearchResults;
