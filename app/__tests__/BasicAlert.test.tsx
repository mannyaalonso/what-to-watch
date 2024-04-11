// Importing necessary modules and setting up test environment
"use client"
import React from "react"
import { test, expect, describe } from "vitest"
import { render, screen } from "@testing-library/react"
import BasicAlert from "../components/BasicAlert" // Importing the BasicAlert component
import "@testing-library/jest-dom/vitest"

// Mock selected options object
const mockSelectedOptions = {
  genre: null,
  mood: null,
  length: null,
}

describe("BasicAlert", () => {
  // Test to check if alert renders with correct error message when error is true
  test("renders alert with correct error message when error is true", () => {
    render(
      <BasicAlert
        selectedOptions={mockSelectedOptions}
        open={true}
        error={true}
      />
    )
    const errorMessageElement = screen.getByText(
      "Looks like there was an error with the server. Please try again."
    )
    expect(errorMessageElement).toBeInTheDocument()
  })

  // Test to check if alert renders with correct error message when error is false
  test("renders alert with correct error message when error is false", () => {
    render(
      <BasicAlert
        selectedOptions={mockSelectedOptions}
        open={true}
        error={false}
      />
    )
    const errorMessageElement = screen.getByText(
      "Error: Please select a value for: Genre, Mood, Length"
    )
    expect(errorMessageElement).toBeInTheDocument()
  })

  // Test to check if alert renders with correct error message when some selected options are missing
  test("renders alert with correct error message when some selected options are missing", () => {
    const selectedOptionsWithErrors = {
      genre: null,
      mood: { id: "1", name: "Test Mood" },
      length: null,
    }
    render(
      <BasicAlert
        selectedOptions={selectedOptionsWithErrors}
        open={true}
        error={false}
      />
    )
    const errorMessageElement = screen.getByText(
      "Error: Please select a value for: Genre, Length"
    )
    expect(errorMessageElement).toBeInTheDocument()
  })

  // Test to check if alert does not render when open is false
  test("does not render alert when open is false", () => {
    render(
      <BasicAlert
        selectedOptions={mockSelectedOptions}
        open={false}
        error={false}
      />
    )
    const errorMessageElement = screen.queryByText(
      "Error: Please select a value for:  Genre Mood Length"
    )
    expect(errorMessageElement).not.toBeInTheDocument()
  })
})