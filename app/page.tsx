// Importing necessary modules
"use client"
import React from "react"
import axios from "axios"
import { useState, useEffect } from "react"

// Importing custom components
import BasicSelect from "./components/BasicSelect"
import BasicGallery from "./components/BasicGallery"
import BasicButton from "./components/BasicButton"
import BasicHeading from "./components/BasicHeading"
import BasicAlert from "./components/BasicAlert"
import OuterContainer from "./components/OuterContainer"
import InnerContainer from "./components/InnerContainer"
import LoadingMessages from "./components/LoadingMessages"

// Interface for the options
interface Option {
  id: string
  name: string
}

// List of genre options
const genreOptions: Option[] = [
  { id: "Action", name: "Action" },
  { id: "Adventure", name: "Adventure" },
  { id: "Animation", name: "Animation" },
  { id: "Comedy", name: "Comedy" },
  { id: "Crime", name: "Crime" },
  { id: "Documentary", name: "Documentary" },
  { id: "Drama", name: "Drama" },
  { id: "Fantasy", name: "Fantasy" },
  { id: "Historical", name: "Historical" },
  { id: "Horror", name: "Horror" },
  { id: "Musical", name: "Musical" },
  { id: "Mystery", name: "Mystery" },
  { id: "Romance", name: "Romance" },
  { id: "Science Fiction", name: "Science Fiction" },
  { id: "Thriller", name: "Thriller" },
  { id: "War", name: "War" },
  { id: "Western", name: "Western" },
  { id: "Biographical", name: "Biographical" },
  { id: "Family", name: "Family" },
  { id: "Sports", name: "Sports" },
  { id: "Supernatural", name: "Supernatural" },
  { id: "Psychological", name: "Psychological" },
  { id: "Noir", name: "Noir" },
  { id: "Disaster", name: "Disaster" },
  { id: "Martial Arts", name: "Martial Arts" },
  { id: "Spy", name: "Spy" },
  { id: "Coming of Age", name: "Coming of Age" },
  { id: "Epic", name: "Epic" },
  { id: "Satire", name: "Satire" },
  { id: "Slice of Life", name: "Slice of Life" },
  { id: "Superhero", name: "Superhero" },
]

// List of mood options
const moodOptions: Option[] = [
  { id: "Bittersweet", name: "Bittersweet" },
  { id: "Captivating", name: "Captivating" },
  { id: "Chilling", name: "Chilling" },
  { id: "Dark", name: "Dark" },
  { id: "Dramatic", name: "Dramatic" },
  { id: "Eerie", name: "Eerie" },
  { id: "Empowering", name: "Empowering" },
  { id: "Enchanting", name: "Enchanting" },
  { id: "Exciting", name: "Exciting" },
  { id: "Heartwarming", name: "Heartwarming" },
  { id: "Hopeful", name: "Hopeful" },
  { id: "Humorous", name: "Humorous" },
  { id: "Inspiring", name: "Inspiring" },
  { id: "Intense", name: "Intense" },
  { id: "Light-hearted", name: "Light-hearted" },
  { id: "Melancholic", name: "Melancholic" },
  { id: "Mysterious", name: "Mysterious" },
  { id: "Nostalgic", name: "Nostalgic" },
  { id: "Poignant", name: "Poignant" },
  { id: "Reflective", name: "Reflective" },
  { id: "Romantic", name: "Romantic" },
  { id: "Serene", name: "Serene" },
  { id: "Suspenseful", name: "Suspenseful" },
  { id: "Thrilling", name: "Thrilling" },
  { id: "Thought-provoking", name: "Thought-provoking" },
  { id: "Touching", name: "Touching" },
  { id: "Triumphant", name: "Triumphant" },
  { id: "Uplifting", name: "Uplifting" },
  { id: "Whimsical", name: "Whimsical" },
  { id: "Witty", name: "Witty" },
]

// List of length options
const lengthOptions: Option[] = [
  { id: "Longer", name: "Longer" },
  { id: "Shorter", name: "Shorter" },
]

// Interface for the movie object
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

// Interface for the selected options
interface SelectedOptions {
  genre: Option | null
  mood: Option | null
  length: Option | null
}

// Initial state for selected options
const initialState: SelectedOptions = {
  genre: null,
  mood: null,
  length: null,
}

// Home component
export default function Home() {
  // State variables
  const [open, setOpen] = useState<boolean>(false) // Modal open state
  const [error, setError] = useState<boolean>(false) // Error state
  const [loading, setLoading] = useState<boolean>(false) // Loading state
  const [movies, setMovies] = useState<Movie[]>([]) // Movie list state
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(initialState) // Selected options state

  // Function to validate selected options
  const validateInput = (): boolean => {
    return !!(
      selectedOptions.genre &&
      selectedOptions.mood &&
      selectedOptions.length
    )
  }

  // Function to fetch movies
  const getMovies = async () => {
    if (validateInput()) {
      //Reset states for error, open and loading
      setOpen(false)
      setError(false)
      setLoading(true)

      try {
        //Fetch movies from chat-gpt and OMDb API
        const response = await axios.post("/api/chat-gpt", {
          genre: selectedOptions.genre!.name,
          mood: selectedOptions.mood!.name,
          length: selectedOptions.length!.name,
          movies: movies,
        })

        // Find content and parse into array
        let content = response?.data?.map((data: any) =>
          JSON.parse(data?.content)
        )

        // Since chat-gpt can suggest the same movie, we remove it from the list
        const uniqueArray = removeDuplicates([...movies, ...content])

        // Sort the array based on time it was fetched so the recent movies stay at the top
        const sortedArray = uniqueArray.sort((a, b) => b.time - a.time)

        // Set the movies state
        setMovies(sortedArray)
      } catch (e) {
        //If there is error, set error and open state to true
        setOpen(true)
        setError(true)
      } finally {
        // Set loading state to false
        setLoading(false)
      }
    } else {
      // If validation fails, set open state to true
      setOpen(true)
    }
  }

  // Function to remove duplicate movies
  const removeDuplicates = (array: Movie[]) => {
    const seen = new Set()
    return array.filter((object) => {
      if (!seen.has(object.title)) {
        seen.add(object.title)
        return true
      }
      return false
    })
  }

  // Function to get random inputs
  const getRandomInputs = () => {
    const randomGenre = Math.floor(Math.random() * genreOptions.length)
    const randomMood = Math.floor(Math.random() * moodOptions.length)
    const randomLength = Math.floor(Math.random() * lengthOptions.length)

    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      genre: genreOptions[randomGenre],
      mood: moodOptions[randomMood],
      length: lengthOptions[randomLength],
    }))
  }

  // Function to clear form and results
  const clearFormAndResults = () => {
    setMovies([])
    setSelectedOptions(initialState)
  }

  // Effect hook to get random inputs on mount
  useEffect(() => {
    getRandomInputs()
  }, [])

  return (
    <>
      <BasicAlert selectedOptions={selectedOptions} error={error} open={open} />

      <OuterContainer>
        <BasicHeading
          title={"What to Watch"}
          subtitle={
            "Pick a Genre, Mood, and Length and let AI recommend some movies."
          }
        />

        <BasicSelect
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          genreOptions={genreOptions}
          moodOptions={moodOptions}
          lengthOptions={lengthOptions}
          setOpen={setOpen}
          loading={loading}
        />

        <InnerContainer>
          <BasicButton loading={loading} onClick={getMovies} text={"Search"} />

          {movies?.length > 0 && (
            <BasicButton
              loading={loading}
              onClick={clearFormAndResults}
              text={"Clear"}
            />
          )}

          <BasicButton
            loading={loading}
            onClick={getRandomInputs}
            text={"Random"}
          />
        </InnerContainer>

        <LoadingMessages loading={loading} />

        <BasicGallery movies={movies} loading={loading} />
      </OuterContainer>
    </>
  )
}