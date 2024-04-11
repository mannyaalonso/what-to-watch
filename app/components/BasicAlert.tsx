// Importing React library and ExclamationTriangleIcon from Heroicons
import React from "react"
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid"

// Interface defining the shape of selected options
interface SelectedOptions {
  genre: { id: string; name: string } | null // Genre option with id and name attributes
  mood: { id: string; name: string } | null // Mood option with id and name attributes
  length: { id: string; name: string } | null // Length option with id and name attributes
}

// Props interface for BasicAlert component
interface BasicAlertProps {
  selectedOptions: SelectedOptions // Selected options for genre, mood, and length
  open: boolean // Indicates whether the alert is open
  error: boolean // Indicates whether there is an error
}

// Functional component for rendering a basic alert
const BasicAlert: React.FC<BasicAlertProps> = ({
  selectedOptions,
  open,
  error,
}) => {
  let errorMessage = "" // Initialize an error message string

  const errors: string[] = [] // Initialize an array to store error messages

  // Check if any option is missing and add corresponding error message to the array
  if (!selectedOptions.genre) errors.push(" Genre")
  if (!selectedOptions.mood) errors.push(" Mood")
  if (!selectedOptions.length) errors.push(" Length")

  // Construct the error message based on the presence of an error
  if (error) {
    errorMessage = `Looks like there was an error with the server. Please try again.`
  } else {
    errorMessage = `Error: Please select a value for: ${errors}`
  }

  return (
    // Render the alert if it's open
    open && (
      <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4 fixed w-full">
        <div className="flex">
          <div className="flex-shrink-0">
            {/* Render the exclamation triangle icon */}
            <ExclamationTriangleIcon
              className="h-5 w-5 text-yellow-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            {/* Render the error message */}
            <p className="text-sm text-yellow-700">{errorMessage}</p>
          </div>
        </div>
      </div>
    )
  )
}

// Exporting BasicAlert component as default
export default BasicAlert
