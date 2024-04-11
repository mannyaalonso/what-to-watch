// Importing required modules and libraries
"use client"
import React from "react"
import axios from "axios"
import { test, expect, describe } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom/vitest"
import Home from "../page"

// Variable to track if axios.get was called
let isGetCalled = false

// Mocking axios post method
axios.post = async () => {
  console.log("axios.get was called")
  isGetCalled = true
  return { data: [] } as any
}

// Test suite for the Home component
describe("Home", () => {
  // Test to check if all essential components are rendered correctly
  test("renders components correctly", () => {
    render(<Home />)

    // Check if all essential components are rendered
    expect(
      screen.getByRole("heading", { name: /what to watch/i })
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /random/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/genre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/mood/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/length/i)).toBeInTheDocument()
  })

  // Test to verify if axios.get is called when Search button is clicked
  test("tests axios gets called when Search button is clicked", async () => {
    render(<Home />)

    // Click on the 'Search' button
    const button = screen.getAllByRole("button", { name: /search/i })
    fireEvent.click(button[0])

    // Check if axios.get was called
    expect(isGetCalled).toBe(true)
  })

  // Test to verify if random inputs are fetched when 'Random' button is clicked
  test("fetches random inputs when 'Random' button is clicked", async () => {
    render(<Home />)

    // Click on the 'Random' button
    const button = screen.getAllByRole("button", { name: /random/i })
    fireEvent.click(button[0])

    // Ensure inputs are updated with random values
    await waitFor(() => {
      const genre = screen.getAllByLabelText(/genre/i)
      expect(genre[0]).toHaveTextContent(
        /action|adventure|animation|comedy|crime|documentary|drama|fantasy|historical|horror|musical|mystery|romance|science fiction|thriller|war|western|biographical|family|sports|supernatural|psychological|noir|disaster|martial arts|spy|coming of age|epic|satire|slice of life|superhero/i
      )

      const mood = screen.getAllByLabelText(/mood/i)
      expect(mood[0]).toHaveTextContent(
        /bittersweet|captivating|chilling|dark|dramatic|eerie|empowering|enchanting|exciting|heartwarming|hopeful|humorous|inspiring|intense|light-hearted|melancholic|mysterious|nostalgic|poignant|reflective|romantic|serene|suspenseful|thrilling|thought-provoking|touching|triumphant|uplifting|whimsical|witty/i
      )

      const length = screen.getAllByLabelText(/length/i)
      expect(length[0]).toHaveTextContent(
        /longer|shorter/i
      )
    })
  })
})
