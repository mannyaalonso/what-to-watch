// Importing React library
import React from "react"

// Defining props interface for BasicHeading component
interface BasicHeadingProps {
  title: string
  subtitle: string
}

// Functional component for rendering a basic heading with title and subtitle
const BasicHeading: React.FC<BasicHeadingProps> = ({ title, subtitle }) => {
  return (
    // Container for the heading and subtitle
    <div className="w-full max-w-5xl text-center">
      {/* Heading with dynamic title */}
      <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
        {title}
      </h1>
      {/* Subtitle with dynamic content */}
      <p className="mt-6 text-lg leading-8 text-gray-300">{subtitle}</p>
    </div>
  )
}

// Exporting BasicHeading component as default
export default BasicHeading
