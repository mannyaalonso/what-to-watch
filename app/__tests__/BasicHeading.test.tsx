// Importing necessary modules and setting up test environment
"use client"
import React from "react"
import { test, expect, describe } from "vitest"
import { render, screen } from "@testing-library/react"
import BasicHeading from "../components/BasicHeading"
import "@testing-library/jest-dom/vitest"

// Test suite for the BasicHeading component
describe("BasicHeading", () => {
  // Test data
  const title = "Test Title"
  const subtitle = "Test Subtitle"

  // Test to check if title and subtitle render correctly
  test("renders title and subtitle correctly", () => {
    render(<BasicHeading title={title} subtitle={subtitle} />)
    // Assertions for title and subtitle elements
    const titleElement = screen.getByText(title)
    const subtitleElement = screen.getByText(subtitle)
    expect(titleElement).toBeInTheDocument()
    expect(subtitleElement).toBeInTheDocument()
  })

  // Test to check if correct classes are applied to title and subtitle elements
  test("applies correct classes to title and subtitle elements", () => {
    render(<BasicHeading title={title} subtitle={subtitle} />)
    // Assertions for title and subtitle classes
    const titleElement = screen.getByText(title)
    const subtitleElement = screen.getByText(subtitle)
    expect(titleElement).toHaveClass(
      "text-4xl",
      "font-bold",
      "tracking-tight",
      "text-white",
      "sm:text-6xl"
    )
    expect(subtitleElement).toHaveClass("text-lg", "leading-8", "text-gray-300")
  })

  // Test to check if title and subtitle have correct text content
  test("has correct text content for title and subtitle", () => {
    render(<BasicHeading title={title} subtitle={subtitle} />)
    // Assertions for title and subtitle text content
    const titleElement = screen.getByText(title)
    const subtitleElement = screen.getByText(subtitle)
    expect(titleElement.textContent).toBe(title)
    expect(subtitleElement.textContent).toBe(subtitle)
  })
})
