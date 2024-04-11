// Importing necessary libraries and components from React and Headless UI
import React, { Fragment, useRef } from "react"
import { Dialog, Transition } from "@headlessui/react"

// Defining types for the Movie object and BasicModalProps
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

interface BasicModalProps {
  selectedMovie: Movie
  open: boolean
  setOpen: (open: boolean) => void
}

// Functional component for displaying modal with movie details
export default function BasicModal({
  selectedMovie,
  open,
  setOpen,
}: BasicModalProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  return (
    // Root Transition component to manage modal state
    <Transition.Root show={open} as={Fragment}>
      {/* Dialog component for the modal */}
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
        data-testid="background-overlay"
      >
        {/* Transition component for the background overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        {/* Main container for the modal content */}
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            {/* Transition component for the modal panel */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-zinc-950 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                {/* Movie details */}
                <div className="sm:flex sm:items-start">
                  {/* Movie poster */}
                  <div className="mx-auto flex h-[300px] w-[200px] flex-shrink-0 items-center justify-center rounded-full bg-red-600 sm:mx-0 ">
                    <div className="aspect-[2/3] h-[300px] w-[200px] overflow-hidden rounded-2xl">
                      <img
                        className="w-full h-full rounded-2xl object-cover transition-all hover:scale-105 cursor-pointer"
                        src={
                          selectedMovie.poster
                            ? selectedMovie.poster !== "N/A"
                              ? selectedMovie.poster
                              : "https://fakeimg.pl/200x300?text=Poster"
                            : "https://fakeimg.pl/200x300?text=Poster"
                        }
                        alt=""
                      />
                    </div>
                  </div>
                  {/* Movie details */}
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-100"
                    >
                      {selectedMovie.title} - {selectedMovie.rated}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-xs text-gray-200">
                        {selectedMovie.genre} - {selectedMovie.runtime}
                      </p>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-200">
                        {selectedMovie.plot}
                      </p>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-200">
                        Director: {selectedMovie.director}
                      </p>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-200">
                        IMDb Rating: {selectedMovie.rating}
                      </p>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-200">
                        {selectedMovie.year}
                      </p>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
