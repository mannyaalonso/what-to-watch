// Importing required modules and libraries
"use client"
import React from "react"
import { test, expect, describe } from "vitest"
import { render, screen } from "@testing-library/react"
import BasicSkeleton from "../components/BasicSkeleton"
import "@testing-library/jest-dom/vitest"

// Test suite for the BasicSkeleton component
describe("BasicSkeleton", () => {
  // Test to check if the skeleton element renders
  test("renders skeleton element", () => {
    render(<BasicSkeleton />)
    const skeleton = screen.getByTestId("basic-skeleton")
    expect(skeleton).toBeInTheDocument()
  })

  // Test to check if the correct classes are applied to the skeleton element
  test("applies correct classes to the skeleton element", () => {
    render(<BasicSkeleton />)
    const skeleton = screen.getAllByTestId("basic-skeleton")
    expect(skeleton[0]).toHaveClass(
      "animate-pulse",
      "aspect-[2/3]",
      "w-full",
      "rounded-2xl",
      "bg-zinc-900"
    )
  })
})
