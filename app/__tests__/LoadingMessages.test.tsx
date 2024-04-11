"use client"
import React from "react"
import { vi, test, expect, describe, beforeEach, afterEach } from "vitest"
import { render, screen, act } from "@testing-library/react"
import LoadingMessages from "../components/LoadingMessages" // Update the import path as needed
import "@testing-library/jest-dom/vitest"

describe("LoadingMessages Component", () => {
  beforeEach(() => {
    // Use Vitest's mock timers
    vi.useFakeTimers()
  })

  afterEach(() => {
    // Clean up and use real timers after tests
    vi.useRealTimers()
  })

  test("displays a loading message when loading", () => {
    render(<LoadingMessages loading={true} />)

    act(() => {
      // Advance time to ensure a message is displayed
      vi.advanceTimersByTime(500)
    })

    const messageElement = screen.getByText(/...$/, { exact: false })
    expect(messageElement).toBeInTheDocument()
  })
})
