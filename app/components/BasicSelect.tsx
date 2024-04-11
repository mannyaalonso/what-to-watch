// Importing necessary libraries and components from React and Headless UI
import React, { Fragment } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid"

// Defining types for the options
interface Option {
  id: string
  name: string
}

// Props interface for BasicSelect component
interface BasicSelectProps {
  selectedOptions: {
    genre: Option | null
    mood: Option | null
    length: Option | null
  }
  setSelectedOptions: (options: {
    genre: Option | null
    mood: Option | null
    length: Option | null
  }) => void
  genreOptions: Option[]
  moodOptions: Option[]
  lengthOptions: Option[]
  setOpen: (open: boolean) => void
  loading: boolean
}

// Function to conditionally apply CSS classes
const classNames = (...classes: (string | boolean)[]) => {
  return classes.filter(Boolean).join(" ")
}

// BasicSelect functional component
const BasicSelect: React.FC<BasicSelectProps> = ({
  selectedOptions,
  setSelectedOptions,
  genreOptions,
  moodOptions,
  lengthOptions,
  setOpen,
  loading,
}) => {
  // Function to handle select change
  const handleSelectChange = (
    key: keyof BasicSelectProps["selectedOptions"],
    option: Option
  ) => {
    if (loading) {
      return
    }
    setSelectedOptions({ ...selectedOptions, [key]: option })
    setOpen(false)
  }

  // Type for selected option key
  type SelectedOptionKey = "genre" | "mood" | "length"

  return (
    // Container for select dropdowns
    <div className="flex flex-col justify-center items-center sm:flex-row md:justify-between gap-4 w-full max-w-5xl mt-5">
      {/* Mapping through genre, mood, and length options */}
      {[
        {
          key: "genre" as SelectedOptionKey,
          label: "Genre",
          options: genreOptions,
        },
        {
          key: "mood" as SelectedOptionKey,
          label: "Mood",
          options: moodOptions,
        },
        {
          key: "length" as SelectedOptionKey,
          label: "Length",
          options: lengthOptions,
        },
      ].map(({ key, label, options }, index) => (
        // Individual select dropdown
        <div key={index} className="w-full md:max-w-xs">
          {/* Headless UI Listbox component */}
          <Listbox
            value={selectedOptions[key]}
            onChange={(value) => handleSelectChange(key, value as Option)}
          >
            {({ open }) => (
              <>
                {/* Label for the select dropdown */}
                <Listbox.Label className="block text-sm font-medium leading-6 text-white text-center">
                  {label}
                </Listbox.Label>
                {/* Container for the select button and options */}
                <div className="relative w-full h-14">
                  {/* Select button */}
                  <Listbox.Button
                    className={`relative w-full h-full cursor-default rounded-md bg-zinc-800 py-1.5 pl-3 pr-10 text-center text-white shadow-md ring-1 ring-inset ring-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      loading ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    {/* Displaying selected option or label */}
                    <span className="block truncate">
                      {selectedOptions[key]?.name
                        ? selectedOptions[key]?.name
                        : label}
                    </span>
                    {/* Chevron icon */}
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-indigo-600"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  {/* Transition component for the select options */}
                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    {/* Listbox options */}
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-zinc-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {/* Mapping through options */}
                      {options.map((option) => (
                        // Individual option
                        <Listbox.Option
                          key={option.id}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "bg-indigo-600 text-white"
                                : "text-white",
                              "relative cursor-default select-none py-2 pl-8 pr-4"
                            )
                          }
                          value={option}
                        >
                          {({ selected, active }) => (
                            <>
                              {/* Option name */}
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "block truncate"
                                )}
                              >
                                {option.name}
                              </span>
                              {/* Check icon for selected option */}
                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text-indigo-600",
                                    "absolute inset-y-0 left-0 flex items-center pl-1.5"
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
      ))}
    </div>
  )
}

// Exporting BasicSelect component as default
export default BasicSelect
