// Importing necessary modules and setting up test environment
"use client"
import React from "react"
import { test, expect, describe } from "vitest"
import "./setupTests"
import { render, screen } from "@testing-library/react"
import BasicModal from "../components/BasicModal"
import "@testing-library/jest-dom/vitest"

// Mock selected movie data
const mockSelectedMovie = {
  title: "Movie Title",
  rated: "PG-13",
  genre: "Action",
  runtime: "120 min",
  plot: "Lorem ipsum dolor sit amet",
  director: "Director Name",
  rating: "7.5",
  year: "2022",
  time: 1623835524419, // Example time, can be any number
}

// Variable to track modal state
let modalOpen = false
const mockSetOpen = () => {
  modalOpen = !modalOpen
}

// Test suite for the BasicModal component
describe("BasicModal", () => {
  // Test to check if the modal renders with correct movie details
  test("renders modal with correct movie details", () => {
    render(
      <BasicModal
        selectedMovie={mockSelectedMovie}
        open={true}
        setOpen={mockSetOpen}
      />
    )

    // Assertions for movie title
    const movieTitle = screen.getByText(
      `${mockSelectedMovie.title} - ${mockSelectedMovie.rated}`
    )
    expect(movieTitle).toBeInTheDocument()

    // Assertions for genre and runtime
    const genreRuntime = screen.getByText(
      `${mockSelectedMovie.genre} - ${mockSelectedMovie.runtime}`
    )
    expect(genreRuntime).toBeInTheDocument()

    // Assertions for movie plot
    const plot = screen.getByText(mockSelectedMovie.plot)
    expect(plot).toBeInTheDocument()

    // Assertions for director
    const director = screen.getByText(`Director: ${mockSelectedMovie.director}`)
    expect(director).toBeInTheDocument()

    // Assertions for IMDb rating
    const rating = screen.getByText(`IMDb Rating: ${mockSelectedMovie.rating}`)
    expect(rating).toBeInTheDocument()

    // Assertions for movie year
    const year = screen.getByText(mockSelectedMovie.year)
    expect(year).toBeInTheDocument()
  })
})
