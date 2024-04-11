// Importing React library and useState hook
import React, { useState } from "react"
// Importing BasicSkeleton and BasicModal components
import BasicSkeleton from "./BasicSkeleton"
import BasicModal from "./BasicModal"

// Defining interface for movie object
interface Movie {
  title: string
  rated: string
  genre: string
  runtime: string
  plot: string
  director: string
  rating: string
  year: string
  time: number
  poster?: string
}

// Props interface for BasicGallery component
interface BasicGalleryProps {
  movies: Movie[]
  loading: boolean
}

// Functional component for rendering a basic gallery of movies
const BasicGallery: React.FC<BasicGalleryProps> = ({ movies, loading }) => {
  // State variables for managing modal open state and selected movie
  const [open, setOpen] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<Movie | {}>({})

  // Function to handle click event on a movie item
  const handleClick = (movie: Movie) => {
    setSelectedMovie(movie)
    setOpen(true)
  }

  return (
    <>
      {/* Render BasicModal component */}
      <BasicModal
        selectedMovie={selectedMovie as Movie}
        open={open}
        setOpen={setOpen}
      />

      {/* Container for the gallery */}
      <div className="mx-auto w-full max-w-5xl">
        {/* List to display movie items */}
        <ul
          role="list"
          className="mx-auto grid max-w-2xl grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {/* Render skeletons while loading */}
          {loading && (
            <>
              <BasicSkeleton />
              <BasicSkeleton />
              <BasicSkeleton />
              <BasicSkeleton />
              <BasicSkeleton />
            </>
          )}

          {/* Iterate over movies array and render each movie item */}
          {movies.map((movie) => (
            <li key={movie.time}>
              {/* Movie item with onClick handler to open modal */}
              <div
                onClick={() => handleClick(movie)}
                className="aspect-[2/3] overflow-hidden rounded-2xl"
              >
                {/* Image component for movie poster */}
                <img
                  className="w-full h-full rounded-2xl object-cover transition-all hover:scale-105 cursor-pointer"
                  src={
                    movie.poster
                      ? movie.poster !== "N/A"
                        ? movie.poster
                        : "https://fakeimg.pl/200x300?text=Poster"
                      : "https://fakeimg.pl/200x300?text=Poster"
                  }
                  alt=""
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

// Exporting BasicGallery component as default
export default BasicGallery
