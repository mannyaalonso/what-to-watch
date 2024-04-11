// Importing React library
import React from "react"

// BasicSkeleton functional component
const BasicSkeleton: React.FC = () => {
  
  return (
    // List item acting as a skeleton with test ID and CSS classes for styling
    <li
      data-testid="basic-skeleton" // Test ID for testing purposes
      className="animate-pulse aspect-[2/3] w-full rounded-2xl bg-zinc-900" // CSS classes for styling
    />
  )
}

// Exporting BasicSkeleton component as default
export default BasicSkeleton