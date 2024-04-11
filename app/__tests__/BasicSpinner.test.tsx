// Importing required modules and libraries
"use client"
import React from "react"
import { test, expect, describe } from "vitest"
import { render, screen } from "@testing-library/react"
import BasicSpinner from "../components/BasicSpinner"
import "@testing-library/jest-dom/vitest"

// Test suite for the BasicSpinner component
describe("BasicSpinner", () => {
  // Test to check if the spinner renders when loading is true
  test("renders spinner when loading is true", () => {
    render(<BasicSpinner loading={true} />)
    const spinner = screen.getByTestId("basic-spinner")
    expect(spinner).toBeInTheDocument()
  })


  // Test to check if the correct classes are applied to the spinner
  test("applies correct classes to the spinner", () => {
    render(<BasicSpinner loading={true} />)
    const spinner = screen.getAllByTestId("basic-spinner")
    expect(spinner[0]).toHaveClass(
      "grid",
      "ml-4",
      "place-items-center",
      "overflow-x-scroll",
      "rounded-lg",
      "lg:overflow-visible"
    )
  })
})
