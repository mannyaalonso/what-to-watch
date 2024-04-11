"use client"

import React, { useState, useEffect } from "react"

// Define props type for LoadingMessages component
interface LoadingMessagesProps {
  loading: boolean
}

const LoadingMessages: React.FC<LoadingMessagesProps> = ({ loading }) => {
  // Messages array
  const messages: string[] = [
    "Thanks for waiting...",
    "Your movies are almost here...",
    "It'll be worth it...",
    "gpt-4-turbo is fast, but not that fast...",
    "Grab some popcorn...",
    "Almost done...",
    "Just a bit longer...",
    "Great choice! We're getting everything ready...",
    "Hang tight, we're on it...",
    "Good things come to those who wait...",
    "We're working magic on your request...",
    "Creating your personalized experience...",
    "Our servers are working hard for you...",
    "Reticulating splines...",
    "Charging flux capacitors...",
    "Summoning dragons...",
    "Waking up the hamsters...",
    "Aligning ley lines...",
    "Preparing the launch pad...",
    "Composing epic music for your arrival...",
    "Brewing coffee, it's going to be a long night...",
    "Counting all the stars in the sky for you...",
    "Sharpening the pencils...",
    "Dusting off the old magic wand...",
    "Consulting the oracle...",
    "Doing the hokey pokey...",
    "Decoding the secrets of the universe...",
    "Making sure it's not too hot, not too cold, but just right...",
    "Looking through the couch cushions for spare change...",
    "At this point, we might as well make a sandwich...",
  ]

  // State for the current message
  const [currentMessage, setCurrentMessage] = useState("")

  useEffect(() => {
    if (!loading) {
      // No action needed when not loading
      return
    }

    // Function to show a random message
    const showRandomMessage = () => {
      const randomIndex = Math.floor(Math.random() * messages.length)
      setCurrentMessage(messages[randomIndex])
    }

    // Show a random message immediately and set an interval for subsequent messages
    showRandomMessage()
    const intervalId = setInterval(showRandomMessage, 5000) // Adjust time as needed

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId)
  }, [loading]) // Depend only on loading

  return (
    <div className="text-white">{loading && <p>{currentMessage}</p>}</div>
  )
}

export default LoadingMessages