// Importing necessary modules and setting up test environment
"use client"
import React from "react"
import { test, expect, describe } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
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

  // Test to check if onClick handler is called when button is clicked
  test("calls onClick handler when button is clicked", () => {
    // Variable to track if button is clicked
    let clicked = false
    // Mock onClick function
    const mockOnClick = () => {
      clicked = true
    }
    render(
      <BasicButton loading={false} onClick={mockOnClick} text="Test Button" />
    )
    // Click the button
    const buttonElement = screen.getByText("Test Button")
    fireEvent.click(buttonElement)
    // Assertion for onClick handler being called
    expect(clicked).toBe(true)
  })

  // Test to check if button is disabled when loading is true
  test("disables button when loading is true", () => {
    render(
      <BasicButton loading={true} onClick={mockOnClick} text={buttonText} />
    )
    const buttonElement = screen.getByText(buttonText)
    expect(buttonElement).toBeDisabled()
  })

  // Test to check if button is enabled when loading is false
  test("enables button when loading is false", () => {
    render(
      <BasicButton loading={false} onClick={mockOnClick} text={buttonText} />
    )
    const buttonElement = screen.getByText(buttonText)
    expect(buttonElement).not.toBeDisabled()
  })

  // Test to check if spinner renders when loading is true and text is "Search"
  test('renders spinner when loading is true and text is "Search"', () => {
    render(<BasicButton loading={true} onClick={mockOnClick} text="Search" />)
    const spinnerElement = screen.getByTestId("basic-spinner")
    expect(spinnerElement).toBeInTheDocument()
  })

  // Test to check if spinner does not render when loading is true but text is not "Search"
  test('does not render spinner when loading is true but text is not "Search"', () => {
    render(<BasicButton loading={true} onClick={mockOnClick} text="Other" />)
    const spinnerElement = screen.queryByTestId("basic-spinner")
    expect(spinnerElement).not.toBeInTheDocument()
  })
})
