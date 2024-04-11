// Importing required modules and libraries
import { NextResponse } from "next/server"
import OpenAI from "openai"
import axios from "axios"

// POST function to handle POST requests
export async function POST(request) {
  // Initializing OpenAI instance with API key from environment variables
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  // Parsing JSON data from request body
  const params = await request.json()
  const excludedMovies = params?.movies?.map((movie) => movie.title)

  // Function to retrieve detailed information about a movie from the OMDB API
  async function getMovieInfo(title) {
    const res = await axios.get(
      `https://www.omdbapi.com/?t=${title}&apikey=${process.env.OMDB_API_KEY}`
    )

    // Returning JSON string with movie details
    return JSON.stringify({
      title: res?.data?.Title,
      year: res?.data?.Year,
      rated: res?.data?.Rated,
      runtime: res?.data?.Runtime,
      genre: res?.data?.Genre,
      director: res?.data?.Director,
      plot: res?.data?.Plot,
      poster: res?.data?.Poster,
      rating: res?.data?.imdbRating,
      time: new Date().getTime(),
    })
  }

  // Step 1: Constructing the initial message to send to the model
  const messages = [
    {
      role: "user",
      content: `Give me a list of minimum five ${params.genre} movies that are ${params.mood} and are ${params.length} in terms of runtime. Don't include the following titles: ${excludedMovies}.`,
    },
  ]

  // Defining available functions for the model
  const tools = [
    {
      type: "function",
      function: {
        name: "get_movie_info",
        description: "Get a list of movies.",
        parameters: {
          // Define parameters for the function
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "The title of the movie e.g. Batman Begins",
            },
            year: {
              type: "string",
              description: "The year it was released",
            },
            rated: {
              type: "string",
              description: "The rating of the movie e.g. PG-13",
            },
            runtime: {
              type: "string",
              description: "The length of the movie e.g. 148 min",
            },
            genre: {
              type: "string",
              description:
                "The genre(s) of the movie e.g. Action, Adventure, Sci-Fi",
            },
            director: {
              type: "string",
              description: "The director of the movie e.g. Christopher Nolan",
            },
            plot: {
              type: "string",
              description: "The plot of the movie",
            },
            poster: {
              type: "string",
              description: "The poster link of the movie",
            },
            rating: {
              type: "string",
              description: "The rating of the movie",
            },
            time: {
              type: "integer",
              description: "The current time",
            },
          },
          required: [
            "title",
            "year",
            "rated",
            "runtime",
            "genre",
            "director",
            "plot",
            "poster",
            "rating",
            "time",
          ],
        },
      },
    },
  ]

  try {
    // Request completion from OpenAI's model
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo", // Specify the model to use
      messages: messages,
      tools: tools,
    })

    const responseMessage = response.choices[0].message

    // Step 2: Check if the model requested a function call
    const toolCalls = responseMessage.tool_calls

    if (responseMessage.tool_calls) {
      // Step 3: Call the function if requested
      const availableFunctions = {
        get_movie_info: getMovieInfo,
      }

      messages.push(responseMessage)

      // Iterate through tool calls and execute corresponding functions
      for (const toolCall of toolCalls) {
        const functionName = toolCall.function.name
        const functionToCall = availableFunctions[functionName]
        const functionArgs = JSON.parse(toolCall.function.arguments)
        const functionResponse = await functionToCall(functionArgs.title)

        // Push function response to messages array
        messages.push({
          tool_call_id: toolCall.id,
          role: "tool",
          name: functionName,
          content: functionResponse,
        })
      }

      // Return response with tool messages
      return NextResponse.json(
        messages.filter((message) => message.role === "tool")
      )
    }
  } catch (error) {
    // Return error message if an error occurs
    return NextResponse.json({ error: error.message })
  }
}
