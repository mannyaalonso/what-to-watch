// Importing necessary modules and setting up test environment
"use client"
import React from "react"
import { test, expect, describe } from "vitest"
import { render, screen } from "@testing-library/react"
import BasicButton from "../components/BasicButton" // Importing the BasicButton component
import "@testing-library/jest-dom/vitest"

describe("BasicButton", () => {
  // Mock onClick function
  let mockOnClick = () => {}
  // Button text
  const buttonText = "Test Button"

  // Test to check if button renders with correct text
  test("renders button with correct text", () => {
    render(
      <BasicButton loading={false} onClick={mockOnClick} text={buttonText} />
    )
    const buttonElement = screen.getByText(buttonText)
    expect(buttonElement).toBeInTheDocument()
  })

  // Test to check if button is enabled when loading is false
  test("enables button when loading is false", () => {
    render(
      <BasicButton loading={false} onClick={mockOnClick} text={buttonText} />
    )
    const buttonElement = screen.getAllByText(buttonText)
    expect(buttonElement[0]).not.toBeDisabled()
  })

  // Test to check if spinner renders when loading is true and text is "Search"
  test('renders spinner when loading is true and text is "Search"', () => {
    render(<BasicButton loading={true} onClick={mockOnClick} text="Search" />)
    const spinnerElement = screen.getByTestId("basic-spinner")
    expect(spinnerElement).toBeInTheDocument()
  })
})
