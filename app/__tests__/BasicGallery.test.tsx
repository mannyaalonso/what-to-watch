// Importing necessary modules and setting up test environment
"use client"
import React from "react"
import { test, expect } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import BasicGallery from "../components/BasicGallery"
import "@testing-library/jest-dom/vitest"

// Mock data for movies
const mockMovies = [
  {
    title: "Movie 1",
    rated: "PG-13",
    genre: "Action",
    runtime: "120 min",
    plot: "Lorem ipsum",
    director: "John Doe",
    rating: "7.5",
    year: "2022",
    time: 1234567890,
    poster: "https://example.com/poster1.jpg",
  },
  {
    title: "Movie 2",
    rated: "PG",
    genre: "Adventure",
    runtime: "110 min",
    plot: "Dolor sit amet",
    director: "Jane Doe",
    rating: "8.0",
    year: "2021",
    time: 1234567891,
    poster: "https://example.com/poster2.jpg",
  },
]

describe("BasicGallery", () => {
  // Test to check if movie posters are rendered correctly
  test("renders movie posters correctly", () => {
    render(<BasicGallery movies={mockMovies} loading={false} />)
    // Get all movie posters
    const moviePosters = screen.getAllByRole("listitem")
    // Assertion for the number of movie posters
    expect(moviePosters).toHaveLength(mockMovies.length)
  })

  // Test to check if modal does not open when loading
  test("does not open modal when loading", () => {
    render(<BasicGallery movies={mockMovies} loading={true} />)
    // Query all movie posters
    const moviePosters = screen.queryAllByRole("listitem")
    // Simulate click event on each movie poster
    moviePosters.forEach((moviePoster) => {
      fireEvent.click(moviePoster)
    })
    // Query modal title
    const modalTitle = screen.queryByText(mockMovies[0].title)
    // Assertion for modal title to be null (not opened)
    expect(modalTitle).toBeNull()
  })
})
