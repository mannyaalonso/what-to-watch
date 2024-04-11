// Importing React library and BasicSpinner component
import React from "react"
import BasicSpinner from "./BasicSpinner"

// Props interface for BasicButton component
interface BasicButtonProps {
  loading: boolean // Indicates whether the button is in a loading state
  onClick: () => void // Function to be called when the button is clicked
  text: string // Text to be displayed on the button
}

// Functional component for rendering a basic button
const BasicButton: React.FC<BasicButtonProps> = ({
  loading,
  onClick,
  text,
}) => {
  // Utility function to concatenate and filter CSS classes
  const classNames = (...classes: (string | boolean)[]) => {
    return classes.filter(Boolean).join(" ")
  }

  return (
    <button
      type="button"
      disabled={loading} // Disable the button if loading
      onClick={onClick} // Call the provided onClick function when clicked
      // Define dynamic CSS classes based on button text
      className={classNames(
        text === "Search" // If text is "Search", apply specific styles
          ? "bg-indigo-600" // Background color for "Search" button
          : "bg-zinc-950 border-2 border-indigo-600", // Default background color and border
        // Common button styles
        "flex justify-center rounded-md px-3.5 py-2.5 w-full sm:max-w-44 text-md font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      )}
    >
      {/* Render button text and spinner if loading */}
      {text} {text === "Search" && <BasicSpinner loading={loading} />}
    </button>
  )
}

// Exporting BasicButton component as default
export default BasicButton
