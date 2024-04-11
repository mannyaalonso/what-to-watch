// Importing required modules and libraries
"use client"
import React from "react"
import { test, expect, describe } from "vitest"
import { render, screen } from "@testing-library/react"
import OuterContainer from "../components/OuterContainer"
import "@testing-library/jest-dom/vitest"

// Test suite for the OuterContainer component
describe("OuterContainer", () => {
  // Test to check if the component renders an element with children
  test("renders element with children", () => {
    render(<OuterContainer>Test</OuterContainer>)
    const mainElement = screen.getByTestId("outer-container")
    expect(mainElement).toBeInTheDocument()
  })

  // Test to check if the component renders an element with correct classes
  test("renders element with correct classes", () => {
    render(<OuterContainer>Test</OuterContainer>)
    const mainElement = screen.getAllByTestId("outer-container")
    expect(mainElement[0]).toHaveClass(
      "flex",
      "flex-col",
      "gap-5",
      "items-center",
      "justify-center",
      "w-full",
      "p-6",
      "lg:p-8"
    )
  })
})
