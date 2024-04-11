![Imgur](https://i.imgur.com/5gcPGr0.jpg)
image generated with AI

# What to Watch App

## Overview
The "What to Watch" app is a movie recommendation application that leverages the ChatGPT and OMDb APIs to suggest movies based on user preferences such as genre, mood, and length. Users can select their preferences, and the app will fetch movie recommendations accordingly.

## Features
- Users can select a genre, mood, and length for movie recommendations.
- The app fetches movie recommendations from the ChatGPT and OMDb APIs.
- Users can clear the form and results or get random inputs for recommendations.

## Speed
Fetching the movies might feel slow, but understand there is a lot going on under the hood. 
1. Calls chat-gpt with the users inputs
2. Structures the response into json 
3. Calls OMDb API one title at a time to get more info and poster image about each movie recommened.

## Components
- BasicAlert component displays error messages for invalid inputs or API errors.
- BasicButton component provides interactive buttons for actions like searching, clearing, and getting random inputs.
- BasicGallery component displays recommended movies in a gallery format.
- BasicHeading component displays a title and subtitle for the app.
- BasicModal component displays the detail of a movie when a poster is clicked
- BasicSelect component provides the selects for genre, mood, and length
- BasicSkeleton component displays a skeleton as movies are being fetched
- BasicSpinner component displays a spinner when movies are being fetched
- InnerContainer component is a simple container that holds the 3 buttons search, clear, random
- OuterContainer component is a simple container that holds the main components

## Live Demo
Visit the live demo here:
- Keep in mind, if the server fails, I most likely ran out of API calls, so feel free to follow installation instructions below to keep testing.

## Installation
1. Clone the repository:
```bash
git clone https://github.com/mannyaalonso/what-to-watch.git
```

2. Create a .env.local file in the root directory:
```bash
touch .env.local
```

3. Add your API keys to the .env.local file:
```bash
OPENAI_API_KEY=your_openai_api_key
OMDB_API_KEY=your_omdb_api_key
```
- Open AI API: https://platform.openai.com/overview
- OMDb API: https://www.omdbapi.com/

4. Install dependencies:
```bash
npm install
```

## Usage

1. Start the development server:
```bash
npm run dev
```

2. Open your web browser and go to http://localhost:3000 to access the app.
3. Select your preferences for genre, mood, and length.
4. Click on the "Search" button to fetch movie recommendations.
5. Optionally, you can clear the form and results by clicking the "Clear" button or get random inputs for recommendations by clicking the "Random" button.

## Backend API
The backend API for fetching movie recommendations is implemented using Next.js API routes. It interacts with the ChatGPT and OMDb APIs to generate movie suggestions based on user preferences.

## Technologies Used
- React.js
- Next.js
- ChatGPT API
- OMDb API
- Axios
- CSS (Styled Components)

## Credits
This app utilizes the ChatGPT API provided by OpenAI for generating movie recommendations.
Movie information is obtained from the OMDb API.
The app design and development are done by Manuel Alonso.

## Running Tests

To run tests, use the following command:
```bash
npm run test
```

- This command will execute the test suite and provide feedback on the app's functionality. 

- You can run each test individually by saving each file or run all tests by saving vite.config.js.

# License
This project is licensed under the MIT License.