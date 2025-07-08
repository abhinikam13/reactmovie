import React from 'react'
import { useEffect, useState } from 'react'
import Search from './components/Search'

import { useDebounce } from 'react-use'
import Spinner from './components/Spinner.jsx'
import MovieCard from './components/MovieCard.jsx'
import { getTrendingMovies, updateSearchCount } from './appwrite.js'


const API_BASE_URL = 'https://www.omdbapi.com/';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [searchTerm, setSearchTerm] = useState('');

  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [trendingMovies, setTrendingMovies] = useState([]);

  // Debounce the search term to prevent making too many API requests
  // by waiting for the user to stop typing for 500ms
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  const fetchMovies = async (query = '') => {
  setIsLoading(true);
  setErrorMessage('');

  try {
    if (!query) {
      setErrorMessage('Please enter a movie name to search');
      setMovieList([]);
      setIsLoading(false);
      return;
    }

    const endpoint = `${API_BASE_URL}?s=${encodeURIComponent(query)}&apikey=${API_KEY}`;
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    const data = await response.json();
    console.log("Fetched data:", data);

    if (data.Response === 'False') {
      setErrorMessage(data.Error || 'Failed to fetch movies');
      setMovieList([]);
      return;
    }

    setMovieList(data.Search || []);

    // if (query && data.Search?.length > 0) {
    //   await updateSearchCount(query, data.Search[0]);
    // }

    if (query && data.Search?.length > 0) {
      await updateSearchCount(query, data.Search[0]);
    }

  } catch (error) {
    console.error(`Error fetching movies: ${error.message}`);
    setErrorMessage('Error fetching movies. Please try again later.');
  } finally {
    setIsLoading(false);
  }
};

// const updateSearchCount = async (query, movie) => {
//   console.log(`Searched "${query}", found movie:`, movie);
// };



const fetchDefaultMovies = async () => {
  const defaultTerms = ["Matrix", "Marvel", "Batman", "Inception", "Avengers", "Spider-Man","john wick"];
  const randomTerm = defaultTerms[Math.floor(Math.random() * defaultTerms.length)];

  console.log(`Showing default movies for: ${randomTerm}`);
  await fetchMovies(randomTerm);
};





  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
       console.log("TRENDING MOVIES FROM APPWRITE:", movies); 

      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  }

  //  useEffect(() => {
  //   fetchMovies(debouncedSearchTerm);
  // }, [debouncedSearchTerm]);

  useEffect(() => {
  if (debouncedSearchTerm) {
    fetchMovies(debouncedSearchTerm);
  } else {
    fetchDefaultMovies();
  }
}, [debouncedSearchTerm]);


  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
      <main>
      <div className="pattern"/>

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url || "/no-poster.png"} alt={movie.searchTerm} />
                  {/* <p>{movie.searchTerm}</p> */}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}
  
export default App