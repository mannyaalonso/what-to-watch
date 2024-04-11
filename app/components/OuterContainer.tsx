// Importing necessary modules
import React, { ReactNode } from "react"

// Defining props interface for OuterContainer component
interface OuterContainerProps {
  children: ReactNode // Children nodes passed to OuterContainer component
}

// OuterContainer functional component
const OuterContainer: React.FC<OuterContainerProps> = ({ children }) => {

  return (
    // Main container element
    <main
      data-testid="outer-container" // Test ID for testing purposes
      className="flex flex-col gap-5 items-center justify-center w-full p-6 lg:p-8" // CSS classes for styling
    >
      {/* Render children components */}
      {children}
    </main>
  )
}

// Exporting OuterContainer component as default
export default OuterContainer
