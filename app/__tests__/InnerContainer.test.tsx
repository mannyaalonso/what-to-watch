// Importing required modules and libraries
"use client"
import React from "react"
import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import InnerContainer from "../components/InnerContainer"
import "@testing-library/jest-dom/vitest"

// Test suite for the InnerContainer component
describe("InnerContainer", () => {
  // Test to check if the component renders an element with children
  test("renders element with children", () => {
    render(<InnerContainer>Test</InnerContainer>)
    const divElement = screen.getByTestId("inner-container")
    expect(divElement).toBeInTheDocument()
  })

  // Test to check if the component renders an element with correct classes
  test("renders element with correct classes", () => {
    render(<InnerContainer>Test</InnerContainer>)
    const divElement = screen.getByTestId("inner-container")
    expect(divElement).toHaveClass(
      "flex",
      "flex-col",
      "sm:flex-row",
      "items-center",
      "justify-center",
      "gap-5",
      "w-full"
    )
  })
})
