// Importing necessary modules and setting up test environment
"use client"
import React from "react"
import { test, expect } from "vitest"
import "./setupTests"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/vitest"
import BasicSelect from "../components/BasicSelect"

// Mock data for genre, mood, and length options
const genreOptions = [
  { id: "Action", name: "Action" },
  { id: "Adventure", name: "Adventure" },
]

const moodOptions = [
  { id: "Bittersweet", name: "Bittersweet" },
  { id: "Captivating", name: "Captivating" },
]

const lengthOptions = [
  { id: "Longer", name: "Longer" },
  { id: "Shorter", name: "Shorter" },
]

// Mock selected options and functions to track function calls
const mockSelectedOptions = {
  genre: null,
  mood: null,
  length: null,
}

let setSelectedOptionsCallCount = 0
const mockSetSelectedOptions = () => {
  setSelectedOptionsCallCount += 1
}

let setOpenCallCount = 0
const mockSetOpen = () => {
  setOpenCallCount += 1
}

// Test suite for the BasicSelect component
describe("BasicSelect", () => {
  // Test to check if the selected option updates when an option is clicked under Genre
  test("updates selected option when an option is clicked under Genre", () => {
    render(
      <BasicSelect
        selectedOptions={mockSelectedOptions}
        setSelectedOptions={mockSetSelectedOptions}
        genreOptions={[genreOptions[0], genreOptions[1]]}
        moodOptions={[moodOptions[0], moodOptions[1]]}
        lengthOptions={[lengthOptions[0], lengthOptions[1]]}
        setOpen={mockSetOpen}
        loading={false}
      />
    )

    // Simulate clicking the dropdown
    const dropdown = screen.getByRole("button", { name: /genre/i })
    fireEvent.click(dropdown)

    // Simulate clicking an option
    const option = screen.getByRole("option", { name: /action/i })
    fireEvent.click(option)

    // Assert that the setSelectedOptions function is called once
    expect(setSelectedOptionsCallCount).toBe(1)
  })

  // Test to check if the selected option updates when an option is clicked under Mood
  test("updates selected option when an option is clicked under Mood", () => {
    render(
      <BasicSelect
        selectedOptions={mockSelectedOptions}
        setSelectedOptions={mockSetSelectedOptions}
        genreOptions={[genreOptions[0], genreOptions[1]]}
        moodOptions={[moodOptions[0], moodOptions[1]]}
        lengthOptions={[lengthOptions[0], lengthOptions[1]]}
        setOpen={mockSetOpen}
        loading={false}
      />
    )

    // Simulate clicking the dropdown
    const dropdown = screen.getByRole("button", { name: /mood/i })
    fireEvent.click(dropdown)

    // Simulate clicking an option
    const option = screen.getByRole("option", { name: /bittersweet/i })
    fireEvent.click(option)

    // Assert that the setSelectedOptions function is called twice
    expect(setSelectedOptionsCallCount).toBe(2)
  })

  // Test to check if the selected option updates when an option is clicked under Length
  test("updates selected option when an option is clicked under Length", () => {
    render(
      <BasicSelect
        selectedOptions={mockSelectedOptions}
        setSelectedOptions={mockSetSelectedOptions}
        genreOptions={[genreOptions[0], genreOptions[1]]}
        moodOptions={[moodOptions[0], moodOptions[1]]}
        lengthOptions={[lengthOptions[0], lengthOptions[1]]}
        setOpen={mockSetOpen}
        loading={false}
      />
    )

    // Simulate clicking the dropdown
    const dropdown = screen.getByRole("button", { name: /length/i })
    fireEvent.click(dropdown)

    // Simulate clicking an option
    const option = screen.getByRole("option", { name: /longer/i })
    fireEvent.click(option)

    // Assert that the setSelectedOptions function is called thrice
    expect(setSelectedOptionsCallCount).toBe(3)
  })
})
