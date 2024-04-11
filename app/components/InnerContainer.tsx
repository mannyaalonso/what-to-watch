// Importing necessary modules
import React, { ReactNode } from "react"

// Defining props interface for InnerContainer component
interface InnerContainerProps {
  children: ReactNode // Children nodes passed to InnerContainer component
}

// InnerContainer functional component
const InnerContainer: React.FC<InnerContainerProps> = ({ children }) => {

  return (
    // Container element with test ID and CSS classes for styling
    <div
      data-testid="inner-container" // Test ID for testing purposes
      className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full" // CSS classes for styling
    >
      {/* Render children components */}
      {children}
    </div>
  )
}

// Exporting InnerContainer component as default
export default InnerContainer
